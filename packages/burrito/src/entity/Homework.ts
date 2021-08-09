import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { TagCategory } from "shared";

@ObjectType()
@Entity("homework")
export class Homework extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column("int")
  userId: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  subjectId: number | null;

  @Field(() => String)
  @Column("text")
  title: string;

  @Field(() => String)
  @Column("text")
  description: string;

  @Field(() => Boolean)
  @Column()
  done: boolean;

  @Field(() => Int)
  @Column("bigint")
  deadline: number;

  @Field(() => Boolean, { nullable: true })
  @Column("boolean", { nullable: true })
  enjoyed: boolean | null;

  @Field(() => Boolean, { nullable: true })
  @Column("boolean", { nullable: true })
  onTime: boolean | null;

  @Field(() => String)
  @Column("text")
  tag: TagCategory;
}
