import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { hash, compare } from "bcrypt";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../utils/AuthHelper";
import { verify } from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";
import { redis } from "../redis";

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

  @Field(() => User)
  user: User;
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

    where if we are querying using `hello`, it will return `hello world`.
   */
  @Query(() => String)
  hello() {
    return "hello world";
  }

  // /**
  //  * a query that retrieve all the users from the database
  //  * @returns all users
  //  */
  // @Query(() => [User])
  // users() {
  //   return User.find();
  // }

  /**
   * In graphql, a mutation is what we create we want to make a change
   * to our database(e.g. create, update)
   */
  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("username") username: string
  ): Promise<boolean> {
    /* hashing the password using the bcrypt library */
    const hashed = await hash(password, 12);

    if (!validateEmail(email)) {
      throw new Error("Invalid email");
    }

    if (password.length < 8) {
      throw new Error("Password too short");
    }

    if (username.length > 14) {
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
    // make it so that the user gets automatically logged in after register
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Registration failed");
    }

    await sendEmail(email, await createConfirmationUrl(user.id));

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

    // if not confirmed
    if (!user.confirmed) {
      throw new Error("Please verify your email before logging in");
    }

    // successfully logged in
    const token = createRefreshToken(user);
    sendRefreshToken(res, token);

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);
    return true;
  }

  /**
   * A query that fetches information about a user
   * @param context
   * @returns
   */
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      context.payload = payload as any;
      const res = await User.findOne(payload.userId);
      if (res && res.confirmed) {
        // only confirmed users are considered to be valid
        return res;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   * Logout resolver
   */
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");
    return true;
  }

  @Mutation(() => Boolean)
  async updateAvatarId(
    @Ctx() { req, payload }: MyContext,
    @Arg("newAvatarId") newAvatarId: number
  ) {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return false;
    }

    const token = authorization.split(" ")[1];
    const newPayload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    payload = newPayload as any;

    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ avatarId: newAvatarId })
        .where("id = :id", { id: newPayload.userId })
        .execute();
      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation(() => LoginResponse)
  async confirmUser(
    @Arg("token") token: string,
    @Ctx() { req, res }: MyContext
  ): Promise<LoginResponse> {
    const userId = await redis.get(token);
    if (!userId) throw new Error("Invalid token");

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });

    redis.del(token);

    const user = await User.findOne({ where: { id: userId } })!;

    const refreshToken = createRefreshToken(user!);
    sendRefreshToken(res, refreshToken);

    return {
      accessToken: createAccessToken(user!),
      user: user!,
    };
  }

  @Query(() => User, { nullable: true })
  async getProfile(@Arg("username") username: string): Promise<User | null> {
    const res = await User.findOne({ where: { username: username } });
    if (res && res.confirmed) {
      // only verified users are considered to be valid
      return res;
    }
    return null;
  }
}
