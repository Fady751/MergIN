import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserInput } from './DTOs/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}

  async create(data: any) {
    return this.prisma.user.create({ data });
  }

  async delete(id: number, curUser?: any) {
    console.log('Current User:', curUser);
    if (curUser?.id !== id) {
      throw new Error('Unauthorized to delete this user');
    }
    return this.prisma.user.delete({ where: { id } });
  }
  async update(id: number, data: UpdateUserInput) {
    return this.prisma.user.update({ where: { id }, data });
  }
   async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findProfileByUserId(userId: number) {
    return this.prisma.jobProfile.findMany({ where: { userId } });
  }

  async getSkillsForProfile(jobProfileId: number) {
    console.log('Fetching skills for JobProfile ID:', jobProfileId);
    const userSkills = await this.prisma.userSkill.findMany({
      where: { jobProfileId },
      include: { skill: true},
    });
    return userSkills.map((us) => us.skill);
  }
}
