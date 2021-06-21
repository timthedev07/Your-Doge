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

const EMAIL_VALIDATION_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validateEmail = (email: string) => {
  return EMAIL_VALIDATION_REGEX.test(email);
};

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
    @Arg("password") password: string,
    @Arg("username") username: string
  ) {
    /* hashing the password using the bcrypt library */
    const hashed = await hash(password, 12);

    if (!validateEmail(email)) {
      throw new Error("Invalid email");
    }

    if (password.length < 8) {
      throw new Error("Password too short");
    }

    if (username.length > 8) {
      throw new Error("Username exceeds the maximal length");
    }

    try {
      /* registering the user by inserting into the database */
      await User.insert({
        email: email,
        password: hashed,
        username: username,
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
