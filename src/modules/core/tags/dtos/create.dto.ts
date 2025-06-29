import { IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateTagDto {
    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsOptional()
    @IsString()
    description?: string;
}
