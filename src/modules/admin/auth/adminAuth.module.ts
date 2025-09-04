import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAdminStrategy } from './strategies/jwtAdmin.strategy';
import { AdminModule } from '../admin.module';
import { JwtRefreshTokenStrategy } from './strategies/jwtRefreshToken.strategy';
import { CustomRedisModule } from 'src/modules/core/redis/redis.module';
@Module({
    imports: [
        forwardRef(() => AdminModule),
        CustomRedisModule
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtAdminStrategy,
        JwtRefreshTokenStrategy,
    ],
    exports: [AuthService],
})
export class AdminAuthModule { }
