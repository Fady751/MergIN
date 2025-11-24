import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersResolver } from './Resolvers/user.resolver';
import { JobProfileResolver } from './Resolvers/jobProfile.resolver';
import { JobProfileService } from './job-profile.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserService, UsersResolver,JobProfileResolver,JobProfileService],
  imports: [AuthModule],
})
export class UserModule {}
