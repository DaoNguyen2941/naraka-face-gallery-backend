import { CreateCategoryDto } from "./create.dto";
import { IsString, } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { DataFileDto } from '../../object-storage/dtos/dataFile.dto';

export class DataCategoryDto extends CreateCategoryDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @Type(() => DataFileDto)
    cover_photo: DataFileDto;

    @Expose()
    @IsString()
    slug: string

}