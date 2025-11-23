import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from '../../GraphQLSchemas/user.model';
import { JobProfile } from '../../GraphQLSchemas/jobprofile.model';
import { CreateUserInput } from '../DTOs/create-user.input';
import { UpdateUserInput } from '../DTOs/update-user.input';
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    const user = await this.userService.delete(id);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.userService.update(id, updateUserInput);
  }
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @ResolveField(() => [JobProfile])
  async jobProfiles(@Parent() user: User) {
    return this.userService.findProfileByUserId(user.id);
  }
}