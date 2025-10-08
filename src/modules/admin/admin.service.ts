
import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from "typeorm";
import { AdminEntity } from './entitys/admin.entity';
import { BasicAdminDataDto, AdminProfileDto } from './dtos';
export type User = any;
import { plainToInstance } from "class-transformer";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { hashData } from 'src/utils/hashData';
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

  async changeUserPassword(adminId: string, oldPassword: string, newPassword: string) {
      const admin = await this.getById(adminId)
      const isPasswordMatching = await bcrypt.compare(
        oldPassword,
        admin?.passwordHash
      );
      if (!isPasswordMatching) {
        throw new BadRequestException('Mật khẩu cũ không đúng');
      }
      const passwordHash = await hashData(newPassword);
      return await this.AdminRepository.update(
        { id: adminId },
        {
          passwordHash: passwordHash
        });
  }

  async getById(adminId: string): Promise<AdminEntity> {
    try {
      const account = await this.AdminRepository.findOne({
        where: { id: adminId },
      });
      if (!account) {
        throw new NotFoundException('User not found');
      }
      return account
    } catch (error) {
      throw new HttpException(
        'Đã xảy ra lỗi không xác định',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async profile(adminId: string): Promise<AdminProfileDto> {
    const data = await this.getById(adminId)
    return plainToInstance(AdminProfileDto, data, {
      excludeExtraneousValues: true,
    })
  }

}
