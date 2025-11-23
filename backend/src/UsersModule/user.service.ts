import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}

   async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findProfileByUserId(userId: number) {
    return this.prisma.jobProfile.findMany({ where: { userId } });
  }

  async getSkillsForProfile(jobProfileId: number) {
    const userSkills = await this.prisma.userSkill.findMany({
      where: { jobProfileId },
      include: { skill: true},
    });
    return userSkills.map((us) => us.skill);
  }
}
