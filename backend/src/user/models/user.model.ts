import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  pfp: string;

  //todos

  //add list of profiles
  //list of messages
  //list of post
  //list of saved post
  //list of tasks
}