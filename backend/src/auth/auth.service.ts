// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './DTOs/create-user.input';
import { LoginInput } from './DTOs/login-input.input';
import { PayloadInput } from './DTOs/payload.input';
import { AuthOutput } from './DTOs/authReturn.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserExist(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const { password, ...safeUser } = user;
    return safeUser;
  }
async validateUser(email: string, cur_password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // const match = await bcrypt.compare(cur_password, user.password);
    // if (!match) throw new UnauthorizedException('Invalid credentials');
    if (cur_password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async loginGetPayload(user: PayloadInput , role?: number): Promise<AuthOutput> {
    const payload = {
      sub: user.id,
      email: user.email,
      profileId: user.profileId ?? null,
      role: role ?? -1,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      id: user.id,
      email: user.email,
      profileId: user.profileId,
      username: (user as any).username,
      accessToken: token,
    };
  }

  async register(data:CreateUserInput) :Promise<AuthOutput>{
    // const hash = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        username: data.username,
      },
    });
    const safeUser :PayloadInput = {
        id: user.id,
        email: user.email,
        username: user.username,
    };
    return await this.loginGetPayload(safeUser) as AuthOutput;
  }

  async login(data:LoginInput , role?:number) {
    const user = await this.validateUser(data.email, data.password);
    return this.loginGetPayload(user as PayloadInput , role);
  }
  async validateTokenUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
