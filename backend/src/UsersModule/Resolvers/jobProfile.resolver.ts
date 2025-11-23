import { Resolver, ResolveField, Parent, Query, Args, Int } from '@nestjs/graphql';
import { JobProfile } from '../../GraphQLSchemas/jobprofile.model';
import { Skill } from '../../GraphQLSchemas/skill.model';
import { JobProfileService } from '../job-profile.service';
import { User } from '../../GraphQLSchemas/user.model';
import { Link } from '../../GraphQLSchemas/link.model';

@Resolver(() => JobProfile)
export class JobProfileResolver {
  constructor(private readonly jobProfileService: JobProfileService) {}

  // Optional: Query to get all job profiles
    @Query(() => [JobProfile], { name: 'jobProfiles' })
    async getJobProfiles(
    @Args('id', { type: () => Int }) id: number)
    : Promise<JobProfile[]> {
    return this.jobProfileService.findAll(id);
    }

    @ResolveField(() => [Skill])
    async skills(@Parent() jobProfile: JobProfile) {
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