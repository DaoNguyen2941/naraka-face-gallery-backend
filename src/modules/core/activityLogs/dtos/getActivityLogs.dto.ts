import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { PageOptionsDto } from 'src/common/dtos';
import { ActivityAction } from '../enums/activity-action.enum';
import { ActivityModule } from '../enums/activity-module.enum';

export class GetActivityLogsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Lọc theo Admin ID' })
  @IsUUID()
  @IsOptional()
  adminId?: string;

  @ApiPropertyOptional({ enum: ActivityModule, description: 'Lọc theo module' })
  @IsEnum(ActivityModule)
  @IsOptional()
  module?: ActivityModule;

  @ApiPropertyOptional({ enum: ActivityAction, description: 'Lọc theo action' })
  @IsEnum(ActivityAction)
  @IsOptional()
  action?: ActivityAction;

  @ApiPropertyOptional({ type: String, format: 'date-time', description: 'Ngày bắt đầu' })
  @Type(() => Date)
  @IsOptional()
  fromDate?: Date;

  @ApiPropertyOptional({ type: String, format: 'date-time', description: 'Ngày kết thúc' })
  @Type(() => Date)
  @IsOptional()
  toDate?: Date;
}
