import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateJobProfileInput {  

  @Field()
  @IsNotEmpty()
  title: string;
}