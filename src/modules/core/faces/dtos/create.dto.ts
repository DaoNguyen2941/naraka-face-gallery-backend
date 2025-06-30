import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID, IsArray } from 'class-validator';

export class CreateFaceDto {
    @Expose()
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    title?: string;

    @Expose()
    @IsOptional()
    @IsString()
    description?: string;

    @IsUUID()
    @IsNotEmpty()
    characterId: string;

    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    categoryIds?: string[];

    @IsArray()
    @IsUUID('all', { each: true })
    @IsOptional()
    tagIds?: string[];

}


