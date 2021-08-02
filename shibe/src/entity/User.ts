import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  /**
   * Here we are basically creating columns for our database
   */

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: "text", unique: true })
  email: string;

  @Field(() => String)
  @Column({ type: "varchar", length: "35", unique: true })
  username: string;

  @Column("text", { nullable: true })
  password: string | null;

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

  @Column("boolean", { default: true })
  emailPrivate: boolean;

  @Column("text", { nullable: true })
  provider: string;
}
