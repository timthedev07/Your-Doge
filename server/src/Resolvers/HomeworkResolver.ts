import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Homework } from "../entity/Homework";
import { MyContext } from "../types/MyContext";
import { isAuth } from "../utils/isAuthMiddleWare";

@ObjectType()
class AllHomeworkResponse {
  @Field(() => [Homework])
  homeworkList: [Homework];

  @Field()
  count: number;
}

@Resolver((of) => Homework)
export class HomeworkResolver {
  @Query(() => [Homework])
  async getAllHomework() {
    const res = await Homework.findAndCount();
    return res[0];
  }

  /**
   * Adds a new task
   * @param context
   * @param title
   * @param description
   * @returns true | false
   */
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addHomework(
    @Ctx() { payload }: MyContext,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("deadline") deadline: string
  ) {
    if (!payload || !payload?.userId) {
      throw new Error("User not authenticated");
    }

    // inserting a new task
    try {
      await Homework.insert({
        userId: parseInt(payload.userId),
        title,
        description,
        deadline: deadline,
        done: false,
        enjoyed: null,
        subjectId: null,
        onTime: null,
      });
      return true;
    } catch (err) {
      throw new Error("Failed to add task, error: " + JSON.stringify(err));
    }
  }

  /**
   * this query is protected and only authenticated users can access it
   *
   * this is for fetching all homework that belongs to a user
   */
  @Query(() => AllHomeworkResponse)
  @UseMiddleware(isAuth)
  async getAllUserHomework(@Ctx() { payload }: MyContext) {
    if (!payload || !payload?.userId) {
      throw new Error("User not authenticated");
    }

    const res = await Homework.findAndCount({
      where: { userId: payload.userId },
    });

    return {
      homeworkList: res[0],
      count: res[1],
    };
  }
}
