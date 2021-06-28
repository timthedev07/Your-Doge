import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";

@ObjectType()
@Unique(["email"]) // here we are forcing an unique constraint on the email
@Entity("users")
export class User extends BaseEntity {
  /**
   * Here we are basically creating columns for our database
   */

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column("text")
  email: string;

  @Field(() => String)
  @Column({ type: "varchar", length: "8" })
  username: string;

  @Column("text")
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @Column("int", { default: 0 })
  serverId: number;
}
