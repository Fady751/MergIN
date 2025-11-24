import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateJobProfileInput {
  @Field()
  userId: number;
  

  @Field()
  @IsNotEmpty()
  title: string;
}