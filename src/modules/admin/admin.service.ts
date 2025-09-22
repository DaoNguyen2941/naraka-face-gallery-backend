
import { Injectable, HttpException, HttpStatus,  } from '@nestjs/common';
import { Repository } from "typeorm";
import { AdminEntity } from './entitys/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { BasicAdminDataDto } from './dtos/baseAdminData.dto';
export type User = any;
import { plainToInstance } from "class-transformer";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AdminService {
  
  constructor(
    @InjectRepository(AdminEntity)
    private AdminRepository: Repository<AdminEntity>,
  ) { }

  async getAdminByUserName(userName: string): Promise<BasicAdminDataDto> {
    try {
      const admin = await this.AdminRepository.findOne({
        where: { username: userName },
        select: {
          id: true,
          username: true,
          passwordHash: true,
          email: true
        }
      });
      return plainToInstance(BasicAdminDataDto, admin, {
        excludeExtraneousValues: true,
      })
    } catch (error) {
      throw new HttpException(
        'Đã xảy ra lỗi không xác định',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

}
