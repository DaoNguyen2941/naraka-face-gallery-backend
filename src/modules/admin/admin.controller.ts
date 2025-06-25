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

@Controller('admin')
export class AdminController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @SkipAuth()
    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    async login(@Request() request: CustomAdminInRequest) {
        const admin = request.user;
        const { accessTokenCookie, token } = this.authService.createAuthCookie(admin);
        const { RefreshTokenCookie, refreshToken } = this.authService.createRefreshCookie(admin)
        request.res.setHeader('Set-Cookie', [accessTokenCookie, RefreshTokenCookie]);
        return {
            message: 'login successfully',
            token: token
        };
    }
    @Get('/data')
    getdata(@Request() request: CustomAdminInRequest) {
        return (request.user)
    }

}