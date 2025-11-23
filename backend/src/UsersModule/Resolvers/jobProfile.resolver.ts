import { Resolver, ResolveField, Parent, Query, Args, Int } from '@nestjs/graphql';
import { JobProfile } from '../models/jobprofile.model';
import { Skill } from '../models/skill.model';
import { JobProfileService } from '../job-profile.service';

@Resolver(() => JobProfile)
export class JobProfileResolver {
  constructor(private readonly jobProfileService: JobProfileService) {}

  // Optional: Query to get all job profiles
    @Query(() => [JobProfile], { name: 'jobProfiles' })
    async getJobProfiles(
    @Args('id', { type: () => Int }) id: number)
    : Promise<JobProfile[]> {
    return this.jobProfileService.findByUserId(id);
    }

    @ResolveField(() => [Skill])
    async skills(@Parent() jobProfile: JobProfile) {
    return this.jobProfileService.findSkillsByProfileId(jobProfile.id);
    }

}