import { Resolver, ResolveField, Parent, Query, Args, Int } from '@nestjs/graphql';
import { JobProfile } from '../../GraphQLSchemas/jobprofile.model';
import { Skill } from '../../GraphQLSchemas/skill.model';
import { JobProfileService } from '../job-profile.service';
import { User } from '../../GraphQLSchemas/user.model';
import { Link } from '../../GraphQLSchemas/link.model';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => JobProfile)
export class JobProfileResolver {
  constructor(private readonly jobProfileService: JobProfileService) {}
  
  @Query(() => JobProfile, { name: 'jobProfiles', nullable: true })
  async getJobProfiles(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: any
  )
    : Promise<JobProfile|null> {
      return this.jobProfileService.findAll(id,user.id);
    }


    @ResolveField(() => [Skill])
    async skills(@Parent() jobProfile: JobProfile) {
        console.log('*** skills field resolver called ***');
    return this.jobProfileService.findSkillsByProfileId(jobProfile.id);
    }

    @ResolveField(() => User)
    async user(@Parent() jobProfile: JobProfile) {
        return this.jobProfileService.getUserByJobProfileId(jobProfile.id);
    }
    
    @ResolveField(() => [Link])
    async links(@Parent() jobProfile: JobProfile) {
      return this.jobProfileService.findLinksByUserId(jobProfile.id);
    }

}