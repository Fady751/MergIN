import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersResolver } from './Resolvers/user.resolver';
import { JobProfileResolver } from './Resolvers/jobProfile.resolver';
import { JobProfileService } from './job-profile.service';

@Module({
  providers: [UserService, UsersResolver,JobProfileResolver,JobProfileService]
})
export class UserModule {}
