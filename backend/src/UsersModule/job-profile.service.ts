import { Injectable } from '@nestjs/common';
import { JobProfile } from './models/jobprofile.model';
import { Skill } from './models/skill.model';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class JobProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUserId(userId: number): Promise<JobProfile[]> {
    return this.prismaService.jobProfile.findMany({
      where: { userId },
    }) as Promise<JobProfile[]>;
  }

  async findSkillsByProfileId(profileId: number): Promise<Skill[]> {
    const profile = await this.prismaService.userSkill.findMany({
      where: { jobProfileId: profileId },
      include: { skill: true },
    });
    return profile.map((ps) => ps.skill) as Skill[];
  }
}
