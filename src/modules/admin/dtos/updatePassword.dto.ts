import { BasicAdminDataDto } from "./baseAdminData.dto";
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { IsNotEqualTo } from "src/common/dtos/IsNotEqualTo";
import { OmitType, PickType } from '@nestjs/mapped-types'

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  @IsNotEqualTo('password', { message: 'Mật khẩu mới không được giống mật khẩu cũ' })
  newPassword: string;
}