import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { JobProfile } from './models/jobprofile.model';
import { CreateUserInput } from './DTOs/create-user.input';
import { Skill } from './models/skill.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.userService.create(createUserInput);
  // }


  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @ResolveField(() => [JobProfile])
  async jobProfiles(@Parent() user: User) {
    return this.userService.findProfileByUserId(user.id);
  }
}

// Separate Resolver for JobProfile to handle its specific nested fields
@Resolver(() => JobProfile)
export class JobProfilesResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => [Skill])
  async skills(@Parent() profile: JobProfile) {
    return this.userService.getSkillsForProfile(profile.id);
  }
}