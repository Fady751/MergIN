import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
// this class has email , password and profileid fields
@InputType()
export class PayloadInput {
    @Field()
    @MinLength(6)
    id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsOptional()
  profileId?: number;
}