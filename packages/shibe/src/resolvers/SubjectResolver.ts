import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Subject } from "../entity/Subject";

@Resolver()
export class SubjectResolver {
  @Mutation(() => Boolean)
  async addSubject(@Arg("name") name: string) {
    if (!name) {
      return false;
    }

    try {
      await Subject.insert({ name });
      return true;
    } catch (err) {
      return false;
    }
  }

  @Query(() => [Subject])
  async subjects() {
    try {
      return await Subject.find();
    } catch (err) {
      return false;
    }
  }
}
