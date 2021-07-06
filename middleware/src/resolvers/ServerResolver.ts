import { Server } from "../entity/Server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class ServerResolver {
  @Query(() => Server, { nullable: true })
  async getAvailable(): Promise<Server | null> {
    const res = await Server.findOne({ where: { available: true } });
    // find an available server
    if (res) {
      return res;
    }

    // if none exists, that means they are all full
    return null;
  }

  @Mutation(() => Boolean)
  async addServer(@Arg("url") url: string): Promise<Boolean> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Server)
        .values([{ url, available: true, usersCount: 0 }])
        .execute();
      return true;
    } catch {
      return false;
    }
  }
}
