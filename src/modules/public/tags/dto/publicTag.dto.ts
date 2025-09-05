import { Expose } from 'class-transformer';
import { IsString, } from 'class-validator';

export class PublicTagDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsString()
    slug: string;
}