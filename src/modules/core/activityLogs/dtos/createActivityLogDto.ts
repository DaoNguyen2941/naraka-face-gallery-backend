import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ActivityAction, ActivityModule } from '../enums';


export class CreateActivityLogDto {
  @IsUUID()
  @IsNotEmpty()
  adminId: string;

  @IsEnum(ActivityModule)
  module: ActivityModule;

  @IsEnum(ActivityAction)
  action: ActivityAction;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;
}
