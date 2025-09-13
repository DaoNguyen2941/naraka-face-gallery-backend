import { Expose, Type } from 'class-transformer';
import { IsString, } from 'class-validator';
import { CreateFaceDto } from './create.dto';
import { DataTagDto } from '../../tags/dtos';
import { DataFileDto } from '../../object-storage/dtos/dataFile.dto';
import { DataCategoryDto } from '../../categories/dtos';
import { DataCharacterDto } from '../../characters/dtos';

export class DataFaceDto extends CreateFaceDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    slug: string

    @Expose()
    @Type(() => DataTagDto)
    tags: DataTagDto[];

    @Expose()
    categories: DataCategoryDto[];

    @Expose()
    character: DataCharacterDto;

    @Expose()
    image?: DataFileDto;
}
// DTO / Type trả về cho frontend
export class FaceWithViewsDto {
    id: string;
    title: string;
    description?: string;

    @Type(() => DataCharacterDto)
    character: DataCharacterDto;

    @Type(() => DataTagDto)
    tags: DataTagDto;

    @Type(() => DataFileDto)
    imageReviews: DataFileDto[];

    @Type(() => DataFileDto)
    qrCodeCN?: DataFileDto;

    @Type(() => DataFileDto)
    qrCodeGlobals?: DataFileDto;

    createdAt: Date;
    updatedAt: Date;
    slug: string;

    totalViews: number;
}