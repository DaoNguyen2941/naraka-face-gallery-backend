import { Strategy } from 'passport-local';
import { PassportStrategy, } from '@nestjs/passport';
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AdminDataDto } from '../../dtos/adminData.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password', })
  }

  async validate(username: string, password: string,): Promise<AdminDataDto> {
    const admin: AdminDataDto | null = await this.authService.validateAdmin(username, password);
    console.log( admin);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}