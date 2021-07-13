import { Directive, Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";

@Directive(`@key(fields: "id")`)
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
  @Column({ type: "varchar", length: "14", unique: true })
  username: string;

  @Column("text")
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @Field(() => Int)
  @Column("int", { default: 0 })
  serverId: number;

  @Field(() => Int)
  @Column("int", { default: 0 })
  avatarId: number;

  @Field(() => String)
  @Column("text", { default: "" })
  bio: string;

  @Field(() => Int)
  @Column("smallint", { default: 0 })
  age: number;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column("bigint", { default: new Date().valueOf() })
  memberSince: number;
}
