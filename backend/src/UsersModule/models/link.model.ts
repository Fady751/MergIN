import { ObjectType, Field, Int } from '@nestjs/graphql';
import { JobProfile } from './jobprofile.model';

@ObjectType()
export class Link {
  @Field(() => Int)
  id: number;

  @Field()
  url: string;

  @Field(() => Int)
  jobProfileId: number;

  @Field(() => JobProfile)
  jobProfile: JobProfile;
}