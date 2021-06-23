import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity("servers")
export class Server extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column("text")
  url: string;

  @Field(() => Int)
  @Column("int")
  userCount: number;

  @Field(() => Boolean)
  @Column("boolean")
  full: boolean;
}
