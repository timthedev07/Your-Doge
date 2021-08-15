import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Subject } from "../entity/Subject";

@Resolver()
export class SubjectResolver {
  @Mutation(() => Boolean)
  async setupSubjects() {
    const subjects: string[] = [
      "Math",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "Spanish",
      "Drama",
      "Art",
      "Dance",
      "ICT",
      "Geography",
      "History",
      "German",
      "French",
      "PE",
      "Russian",
      "Italian",
      "Science",
      "Social Studies",
      "Valencian",
      "Business Study",
      "Computer Science",
      "Economics",
      "Chinese",
      "Japanese",
    ];

    for (const subject of subjects) {
      try {
        await Subject.insert({ name: subject });
      } catch (err) {
        return false;
      }
    }

    return true;
  }

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
