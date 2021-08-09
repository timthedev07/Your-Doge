import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";

@ObjectType()
@Unique(["url"])
@Entity("servers")
export class Server extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column("text")
  url: string;

  @Field(() => String)
  @Column("boolean")
  available: boolean;

  @Field(() => Int)
  @Column("int")
  usersCount: number;
}
