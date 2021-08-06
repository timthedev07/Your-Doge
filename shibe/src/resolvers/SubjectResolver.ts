import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Subject } from "../entity/Subject";

@Resolver()
export class SubjectResolver {
  @Mutation(() => Boolean)
  async addSubject(@Arg("name") name: string) {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Subject)
        .values({ name })
        .execute();
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
