import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAdminStrategy } from './strategies/jwtAdmin.strategy';
import { JwtAdminAuthGuard } from './guards/jwtAdminAuth.guard';
import { APP_GUARD } from '@nestjs/core';
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
        {
            provide: APP_GUARD,
            useClass: JwtAdminAuthGuard,
        },
    ],
    exports: [AuthService],
})
export class AdminAuthModule { }
