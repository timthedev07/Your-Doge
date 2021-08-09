import { getConnection } from "typeorm";
import { User } from "../entity/User";

export const userCleanup = async () => {
  /* now it's the clean up part, delete all unverified users registered more than 3 days ago */
  const threeDaysAgo = new Date().valueOf() - 1000 * 60 * 60 * 24 * 3;

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("confirmed = :confirmed AND memberSince <= :threeDaysAgo", {
      confirmed: false,
      threeDaysAgo,
    })
    .returning("*")
    .execute();
};
