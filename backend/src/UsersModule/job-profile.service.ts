import { Injectable } from '@nestjs/common';
import { JobProfile } from '../GraphQLSchemas/jobprofile.model';
import { Skill } from '../GraphQLSchemas/skill.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { Link } from '../GraphQLSchemas/link.model';
import { UpdateJobProfileInput } from './DTOs/update-jobprofile.input';
@Injectable()
export class JobProfileService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createJobProfileInput: any, userId: number): Promise<JobProfile> {
    const newJobProfile = await this.prismaService.jobProfile.create({
      data: {
        ...createJobProfileInput,
        userId: userId,
      },
    });
    return newJobProfile as unknown as JobProfile;
  }
  
  async update(updateJobProfileInput: UpdateJobProfileInput , curProfileId: number): Promise<JobProfile> {

    const updatedJobProfile = await this.prismaService.jobProfile.update({
      where: { id:curProfileId },
      data: {
       title: updateJobProfileInput.title,
      },
    });
    return updatedJobProfile as unknown as JobProfile;
  }
  async findAll(id:number, curUSerId:number): Promise<JobProfile | null> {

    const idProfile = await this.prismaService.jobProfile.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!idProfile || idProfile.userId !== curUSerId) {
      return null;
    }
    return idProfile as unknown as JobProfile;
  }

  async getUserByJobProfileId(jobProfileId: number) {
    return this.prismaService.jobProfile
      .findUnique({ where: { id: jobProfileId } })
      .user();
  }

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
  async findLinksByUserId(userId: number):Promise<Link[]> {
    const profiles = await this.prismaService.link.findMany({
      where: { jobProfile: { userId } },
      
    });
    return profiles as Link[];
  }
}
