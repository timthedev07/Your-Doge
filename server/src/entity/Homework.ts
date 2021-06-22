import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity("homework")
export class User extends BaseEntity {
  /**
   * Here we are basically creating columns for our database
   */

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column("int")
  userId: number;

  @Field(() => Int)
  @Column("int")
  subjectId: number;

  @Field(() => String)
  @Column("text")
  title: string;

  @Field(() => String)
  @Column("text")
  description: string;

  @Field(() => Boolean)
  @Column()
  done: boolean;

  @Field(() => String)
  @Column("date")
  deadline: String;
}
