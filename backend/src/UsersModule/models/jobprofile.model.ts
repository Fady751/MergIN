import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.model';
import { Link } from './link.model';
import { Skill } from './skill.model';
import { Review } from './review.model';
// Import Post/Friendship only if you are ready to handle cross-module circular imports
// import { Post } from '../../posts/entities/post.entity'; 

@ObjectType()
export class JobProfile {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  user: User;

  @Field(() => [Link], { nullable: true })
  links?: Link[];

  @Field(() => [Skill], { nullable: true })
  skills?: Skill[];

  @Field(() => [Review], { nullable: true })
  reviewsReceived?: Review[];

  @Field(() => [Review], { nullable: true })
  reviewsGiven?: Review[];
}