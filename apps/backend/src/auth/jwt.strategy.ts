import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 's3cret',
    });
  }

  async validate(payload: any): Promise<any> {
    // TODO Get user by paylod.userId and return User here
    console.log(payload);
    return { userId: payload.userId, email: payload.email };
  }
}
