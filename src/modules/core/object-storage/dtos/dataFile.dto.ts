import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class DataFileDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    key: string;

    @Expose()
    @IsString()
    url: string;

    @Expose()
    @IsString()
    type: string;

    @Expose()
    @IsString()
    size: string;

    @Expose()
    @IsString()
    originalName: string;

    @Expose()
    @IsString()
    usage: string;
}