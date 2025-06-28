import {
    Controller,
    Body,
    Post,
    UseGuards,
    Request,
    Get,
    HttpCode,
} from "@nestjs/common";
import { SkipAuth } from "src/common/decorate/skipAuth";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { CustomAdminInRequest } from "./dtos/customAdminInRequest.dto";
import { RedisCacheService } from "../core/redis/services/cache.service";
import { jwtConstants } from 'src/config/constants/jwt.constants';
import JwtRefreshGuard from "./auth/guards/Jwt-Refresh.guard";
import { hashData } from "src/utils/hashData";
@Controller('admin')
export class AdminController {
    constructor(
        private readonly authService: AuthService,
        private readonly cacheService: RedisCacheService,
    ) { }

    @SkipAuth()
    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    async login(@Request() request: CustomAdminInRequest) {
        const admin = request.user;
        const { accessTokenCookie, token } = this.authService.createAuthCookie(admin);
        const { RefreshTokenCookie, refreshToken } = this.authService.createRefreshCookie(admin)
        const hashRefreshToken = await hashData(refreshToken)
        await this.cacheService.setCache('admin-Refresh-Token', hashRefreshToken, jwtConstants.expirationTime)
        request.res.setHeader('Set-Cookie', [accessTokenCookie, RefreshTokenCookie]);
        return {
            message: 'login successfully',
        };
    }

    @SkipAuth()
    @UseGuards(JwtRefreshGuard)
    @Get('/auth/refresh')
    refresh(@Request() request: CustomAdminInRequest) {
        const { user } = request;
        const { accessTokenCookie, token } = this.authService.createAuthCookie(user);
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return ({
            message: 'Token refreshed successfully',
        });
    }


}