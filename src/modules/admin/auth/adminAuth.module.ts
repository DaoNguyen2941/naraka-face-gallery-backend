import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAdminStrategy } from './strategies/jwtAdmin.strategy';
import { JwtAdminAuthGuard } from './guards/jwtAdminAuth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from '../admin.module';

@Module({
    imports: [
        forwardRef(() => AdminModule),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtAdminStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAdminAuthGuard,
        },
    ],
    exports: [AuthService],
})
export class AdminAuthModule { }
