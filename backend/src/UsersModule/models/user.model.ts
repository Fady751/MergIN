import { ObjectType, Field, Int } from '@nestjs/graphql';
import { JobProfile } from './jobprofile.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  pfp?: string;

  @Field(() => [JobProfile], { nullable: 'itemsAndList' })
  jobProfiles?: JobProfile[];
}