// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './DTOs/create-user.input';
import { LoginInput } from './DTOs/login-input.input';
import { PayloadInput } from './DTOs/payload.input';

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

    if (user.password != cur_password) throw new UnauthorizedException('Invalid credentials');

    const { password, ...safeUser } = user;
    return safeUser;
  }

  async loginGetPayload(user: PayloadInput , role?:number) {
    const payload = { sub: user.id, email: user.email , profileId: user.profileId , role: role ?? -1};
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data:CreateUserInput) {
    const hash = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hash,
        username: data.username,
      },
    });
    let safeUser :PayloadInput = {
        id: user.id,
        email: user.email,
        username: user.username,
    };
    return this.loginGetPayload(safeUser);
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
