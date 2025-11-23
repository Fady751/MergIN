import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  @MinLength(6)
  @IsOptional()
  password?: string;
}