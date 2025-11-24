import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadInput } from '../DTOs/payload.input';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: PayloadInput) {
    const user =  await this.authService.validateUserExist(payload.username);
    console.log('*** JWT Strategy validate called ***');
    console.log("hi", payload);
    if (!user) {
      throw new Error('Unauthorized');
    }
    return {
      userId: payload.id,
      email: payload.email,
      profileId: payload.profileId ?? null,
    };
  }
}
