import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        '-----BEGIN PUBLIC KEY-----\n' +
        process.env.PUBLIC_KEY +
        '\n-----END PUBLIC KEY-----',
    });
  }

  async validate(payload: any) {
    return await this.authService.syncUser(payload.sub, payload.username);
  }
}
