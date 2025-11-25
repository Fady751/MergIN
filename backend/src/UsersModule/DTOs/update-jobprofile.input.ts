import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateJobProfileInput {

// @Field({ nullable: true })
//   @IsOptional()
//   userId?: number;
  

  @Field({ nullable: true })
  title?: string;
}