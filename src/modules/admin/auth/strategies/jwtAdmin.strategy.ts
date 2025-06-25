import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'src/config/constants/jwt.constants';
import { JWTDecoded } from '../dtos/jwtDecoded';
import { Request } from 'express';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy,'admin-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JWTDecoded) {    
    console.log(payload);
    
    const user = { id: payload.sub, username: payload.username};
    return user;
  }
}
