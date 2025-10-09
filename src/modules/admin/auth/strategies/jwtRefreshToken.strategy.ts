
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JWTDecoded } from '../dtos/jwtDecoded';
import { jwtConstants } from 'src/config/constants/jwt.constants';
import { AdminDataDto } from '../../dtos/adminData.dto';
import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { RedisCacheService } from 'src/modules/core/redis/services/cache.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private readonly cacheService: RedisCacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Refresh;
      }]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JWTDecoded) {
    const refreshToken = request.cookies?.Refresh;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const refreshTokenSecret = await this.cacheService.getCache('admin-Refresh-Token');
      if (!refreshTokenSecret) {
        throw new UnauthorizedException('No refresh token stored');
      }


      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        refreshTokenSecret
      );

      if (!isRefreshTokenMatching) {
        throw new UnauthorizedException('Invalid refresh token');
      }
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const admin: AdminDataDto = { id: payload.sub, username: payload.username };
    return admin;
  }
}