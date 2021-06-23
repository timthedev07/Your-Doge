import {
  Arg,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
  Mutation,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Server } from "./entity/Servers";

@ObjectType()
export class ServerStatus {
  @Field(() => Int)
  userCount: number;

  @Field(() => Boolean)
  full: boolean;
}

@ObjectType()
export class AvailableServerQueryResult {
  @Field(() => Int)
  userCount: number;

  @Field(() => String)
  url: string;
}

@Resolver()
export class ServerResolver {
  @Query(() => AvailableServerQueryResult)
  async getAvailableServer() {
    // get all servers and count
    const response = await getConnection()
      .createQueryBuilder()
      .select("servers")
      .from(Server, "servers")
      .getManyAndCount();

    const allServers = response[0];

    // checking one by one for a working server
    for (let i = 0; i < response[1]; i++) {
      if (!allServers[i].full) {
        return {
          userCount: allServers[i].userCount,
          url: allServers[i].url,
        };
      }
    }

    // if all of them are full, well, we gotta create a new one but just throw an error
    throw new Error("Sorry, all servers are full");
  }

  @Mutation(() => Boolean)
  async updateServerRecord(@Arg("serverId") serverId: number) {
    try {
      await getConnection()
        .getRepository(Server)
        .increment({ id: serverId }, "userCount", 1);
      return true;
    } catch (err) {
      throw new Error("Failed to increment");
    }
  }

  @Query(() => ServerStatus)
  async getServerStatus(@Arg("serverId") serverId: number) {
    const res = await Server.findOne({ where: { id: serverId } });

    if (!res) {
      throw new Error("Server not found");
    }

    return {
      userCount: res.userCount,
      full: res.full,
    };
  }
}
