import { Resolver, ResolveField, Parent, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { JobProfile } from '../../GraphQLSchemas/jobprofile.model';
import { Skill } from '../../GraphQLSchemas/skill.model';
import { JobProfileService } from '../job-profile.service';
import { User } from '../../GraphQLSchemas/user.model';
import { Link } from '../../GraphQLSchemas/link.model';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateJobProfileInput } from '../DTOs/create-jobProfile.input';
import { UpdateJobProfileInput } from '../DTOs/update-jobprofile.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => JobProfile)
export class JobProfileResolver {
  constructor(private readonly jobProfileService: JobProfileService) {}
  //mutations
  //create a JobProfile
  @Mutation(() => JobProfile)
  async createJobProfile(
    @Args('createJobProfileInput') createJobProfileInput: CreateJobProfileInput,
    @CurrentUser() user: any
  ) {
    return this.jobProfileService.create(createJobProfileInput, user.id);
  }
  
  @Mutation(()=> JobProfile)
  async updateJobProfile(
    @Args('updateJobProfileInput') updateJobProfileInput: UpdateJobProfileInput,
    @CurrentUser() user: any
  ) {
    return this.jobProfileService.update(updateJobProfileInput, user.profileId); 
  }

  @Mutation(()=>JobProfile)
  async deleteJobProfile(
      @CurrentUser() user: any
  ){
    
  }
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