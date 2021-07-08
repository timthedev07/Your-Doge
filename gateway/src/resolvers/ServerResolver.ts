import { Server } from "../entity/Server";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

const LIMIT = 20;
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

  @Mutation(() => Boolean)
  async registerUser() {
    const available = await this.getAvailable();

    if (!available) {
      return false;
    }

    const newCount = available.usersCount + 1;

    available.save({
      data: { usersCount: newCount, available: newCount < LIMIT },
    });

    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("serverId") serverId: number) {
    const server = await Server.findOne({ where: { id: serverId } });

    if (!server) {
      return false;
    }

    const newCount = server.usersCount - 1;

    server.save({
      data: { usersCount: newCount, available: newCount < LIMIT },
    });

    return true;
  }
}
