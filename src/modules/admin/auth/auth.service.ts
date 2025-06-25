
import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin.service';
import { BasicAdminDataDto } from '../dtos/baseAdminData.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from "class-transformer";
import { AdminDataDto } from '../dtos/adminData.dto';
import { JWTPayload } from './dtos/jwtPayload';
import { JwtService } from '@nestjs/jwt';
import { createCookie } from 'src/utils/cookie';
import { jwtConstants } from 'src/config/constants/jwt.constants';


@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private jwtService: JwtService,
    ) { }

    public createRefreshCookie(admin: AdminDataDto) {
        const payload: JWTPayload = {
            sub: admin.id,
            username: admin.username,
        };
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: `${jwtConstants.expirationTime}s`,
            secret: jwtConstants.refreshTokenSecret,
        });
        const RefreshTokenCookie = createCookie('Refresh', refreshToken, '/auth/refresh', jwtConstants.expirationTime)
        return {
            RefreshTokenCookie,
            refreshToken
        }
    }

    public createAuthCookie(adminData: AdminDataDto) {
        console.log(adminData);
        
        const payload: JWTPayload = {
            sub: adminData.id,
            username: adminData.username,
        };
        const token = this.jwtService.sign(payload);
        const cookie = createCookie('Authentication', token, '/', jwtConstants.expirationTimeDefault)
        return {
            accessTokenCookie: cookie,
            token: token
        }
    }

    async validateAdmin(username: string, pass: string): Promise<AdminDataDto | null> {
        const adminData: BasicAdminDataDto = await this.adminService.getAdminByUserName(username)
        if (!adminData) { return null; }
        const isPasswordMatching = await bcrypt.compare(
            pass, adminData.passwordHash
        );
        if (adminData && isPasswordMatching) {
            return plainToInstance(AdminDataDto, adminData, {
                excludeExtraneousValues: true,
            })
        }
        return null;
    }
}
