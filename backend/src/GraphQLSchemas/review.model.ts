import { ObjectType, Field, Int } from '@nestjs/graphql';
import { JobProfile } from './jobprofile.model';

@ObjectType()
export class Review {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => Int)
  rate: number;

  @Field(() => Int)
  raterId: number;

  @Field(() => JobProfile)
  rater: JobProfile;

  @Field(() => Int)
  ratedId: number;

  @Field(() => JobProfile)
  rated: JobProfile;
}