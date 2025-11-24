import { Resolver, ResolveField, Parent, Query, Args, Int } from '@nestjs/graphql';
import { JobProfile } from '../../GraphQLSchemas/jobprofile.model';
import { Skill } from '../../GraphQLSchemas/skill.model';
import { JobProfileService } from '../job-profile.service';
import { User } from '../../GraphQLSchemas/user.model';
import { Link } from '../../GraphQLSchemas/link.model';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => JobProfile)
export class JobProfileResolver {
  constructor(private readonly jobProfileService: JobProfileService) {}
  
  @Query(() => [JobProfile], { name: 'jobProfiles' })
  async getJobProfiles(
    @Args('id', { type: () => Int }) id: number)
    : Promise<JobProfile[]> {
      return this.jobProfileService.findAll(id);
    }


    @ResolveField(() => [Skill])
    async skills(@Parent() jobProfile: JobProfile) {
        console.log('*** skills field resolver called ***');
    return this.jobProfileService.findSkillsByProfileId(jobProfile.id);
    }

    @UseGuards(GqlAuthGuard)
    @ResolveField(() => User)
    async user(@Parent() jobProfile: JobProfile) {
        return this.jobProfileService.getUserByJobProfileId(jobProfile.id);
    }

    @UseGuards(GqlAuthGuard)
    @ResolveField(() => [Link])
    async links(@Parent() jobProfile: JobProfile) {
      return this.jobProfileService.findLinksByUserId(jobProfile.id);
    }

}