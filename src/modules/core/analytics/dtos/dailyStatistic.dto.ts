import { IsOptional, IsString, IsInt, Min, IsNumber } from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class GetDailyStatsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  start?: string; // YYYY-MM-DD

  @IsOptional()
  @IsString()
  end?: string;   // YYYY-MM-DD
}

export class GetPageTrafficDto {
  @IsString()
  date: string;
}

export class PageTrafficDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  date: string;

  @Expose()
  @IsString()
  path: string;

  @Expose()
  @IsNumber()
  views: number;
}
