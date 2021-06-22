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
import { Homework } from "../entity/Homework";
import { MyContext } from "../MyContext";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../AuthHelper";
import { isAuth } from "../isAuthMiddleWare";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

@ObjectType()
class AllHomeworkResponse {
  @Field()
  homeworkList: [Homework];

  @Field()
  count: number;
}

@Resolver()
export class HomeworkResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addHomework(
    @Ctx() { payload }: MyContext,
    @Arg("title") title: string,
    @Arg("description") description: string
  ) {
    if (!payload || !payload?.userId) {
      throw new Error("User not authenticated");
    }

    const today = new Date();

    const res = await Homework.insert({
      userId: parseInt(payload.userId),
      title,
      description,
      deadline: `${today.valueOf()}`,
      done: false,
      enjoyed: null,
    });
  }

  /**
   * this query is protected and only authenticated users can access it
   *
   * this is for fetching all homework that belongs to a user
   */
  @Query(() => AllHomeworkResponse)
  @UseMiddleware(isAuth)
  async allHomework(@Ctx() { payload }: MyContext) {
    if (!payload || !payload?.userId) {
      throw new Error("User not authenticated");
    }
    const res = await Homework.findAndCount({
      where: { userId: payload.userId },
    });
    return res;
  }
}
