import { Server } from "../entity/Server";
import { getConnection } from "typeorm";

const LIMIT = 20;
export const getAvailable = async (): Promise<Server | null> => {
  const res = await Server.findOne({ where: { available: true } });

  // find an available server
  if (res) {
    return res;
  }

  // if none exists, that means they are all full
  return null;
};

export const addServer = async (url: string): Promise<Boolean> => {
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
};

/**
 *
 * @returns a tuple consisting of [serverId, async mutateServerRecordFunction] - if there is an available server. -1 otherwise
 */
export const registerUser: () => Promise<[number, () => Promise<void>] | -1> =
  async () => {
    const available = await getAvailable();

    if (!available) {
      return -1;
    }

    const mutate = async () => {
      const newCount = available.usersCount + 1;

      await getConnection()
        .createQueryBuilder()
        .update(Server)
        .set({ usersCount: newCount, available: newCount < LIMIT })
        .where("id = :id", { id: available.id })
        .execute();
    };

    return [available.id, mutate];
  };

export const deleteUser: (serverId: number) => Promise<boolean> = async (
  serverId: number
) => {
  const server = await Server.findOne({ where: { id: serverId } });

  if (!server) {
    return false;
  }

  const newCount = server.usersCount - 1;

  await getConnection()
    .createQueryBuilder()
    .update(Server)
    .set({ usersCount: newCount, available: newCount < LIMIT })
    .where("id = :id", { id: server.id })
    .execute();

  return true;
};
