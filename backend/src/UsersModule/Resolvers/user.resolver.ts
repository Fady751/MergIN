import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from '../../GraphQLSchemas/user.model';
import { JobProfile } from '../../GraphQLSchemas/jobprofile.model';
import { CreateUserInput } from '../DTOs/create-user.input';
import { UpdateUserInput } from '../DTOs/update-user.input';
import { AuthService } from 'src/auth/auth.service';
import { PayloadInput } from 'src/auth/DTOs/payload.input';
import { AuthOutput } from 'src/auth/DTOs/authReturn.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

@UseGuards(GqlAuthGuard)
@Query(() => String)
helloUser(@CurrentUser() user) {
  console.log('User from token:', user);
  return `Hello ${user.email}`;
}
  @Mutation(() => AuthOutput)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.register(createUserInput);
  }

  //login mutation
  @Mutation(() => AuthOutput)
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
    //oprional profileId argument
    @Args('profileId', { type: () => Int, nullable: true }) profileId?: number,  
  ) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.loginGetPayload(user, profileId);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number , @CurrentUser() data: any) {
    const user = await this.userService.delete(id, data);
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.userService.update(id, updateUserInput);
  }
  
  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@CurrentUser() { id }: any) {
    
    return this.userService.findOne(id);
  }

  @ResolveField(() => [JobProfile])
  async jobProfiles(@Parent() user: User) {
    return this.userService.findProfileByUserId(user.id);
  }
}