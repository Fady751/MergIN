import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@ObjectType()
export class AuthOutput {
    @Field()
    id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsOptional()
  profileId?: number;
  
  @Field()
  username: string; 
  
    @Field()
    @IsOptional()
    accessToken: string;
}