import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcrypt";
import { User } from "./entity/User";
import { MyContext } from "./MyContext";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "./AuthHelper";
import { isAuth } from "./isAuthMiddleWare";
import { getConnection } from "typeorm";

// defining our own object type consisting of a few fields
@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  /**
	 * The code below is basically the same as:
	 * typeDefs: `
			type Query {
				hello: String
			}
		`,
    resolvers: {
      Query: {
        hello: () => "hello world",
      },
    },

		where if we are querying using `hello`, we return `hello world`.
	 */
  @Query(() => String)
  hello() {
    return "hello world";
  }

  /* this query is protected and only authenticated users can access it */
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return `your user id is: ${payload!.userId}`;
  }

  /**
   * a query that retrieve all the users from the database
   * @returns all users
   */
  @Query(() => [User])
  users() {
    return User.find();
  }

  /**
   * In graphql, a mutation is what we create we want to make a change
   * to our database(e.g. create, update)
   */
  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    /* hashing the password using the bcrypt library */
    const hashed = await hash(password, 12);

    try {
      /* registering the user by inserting into the database */
      await User.insert({
        email: email,
        password: hashed,
      });
    } catch (err) {
      throw new Error("Email already registered");
    }
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ): Promise<LoginResponse> {
    // here we are searching for a user that has the same email
    const user = await User.findOne({ where: { email } });

    // if user does not exist
    if (!user) {
      throw new Error("Invalid username/password");
    }

    /* comparing the password stored in the database
			with the password the user typed in
		*/
    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid username/password");
    }

    // successfully logged in
    const token = createRefreshToken(user);
    sendRefreshToken(res, token);

    return {
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);
    return true;
  }
}
