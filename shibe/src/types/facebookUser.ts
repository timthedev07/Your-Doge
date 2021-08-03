import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class FacebookUser {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
}
