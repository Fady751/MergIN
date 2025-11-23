import { ObjectType, Field, Int } from '@nestjs/graphql';
import { JobProfile } from './jobprofile.model';

@ObjectType()
export class Skill {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => [JobProfile], { nullable: 'itemsAndList' })
  jobProfiles?: JobProfile[];

}