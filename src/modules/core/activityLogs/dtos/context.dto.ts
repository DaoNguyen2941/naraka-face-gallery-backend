import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';


export class ContextLogDto {
    @Expose()
    @IsUUID()
    adminId: string;

    @Expose()
    @IsOptional()
    @IsString()
    ipAddress?: string;

    @Expose()
    @IsOptional()
    @IsString()
    userAgent?: string;
}