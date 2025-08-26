import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID, IsArray, } from 'class-validator';
import { Transform } from 'class-transformer';

export class GroupFile {
  fileImageReviews: Express.Multer.File[];
  fileQrCodeGlobals?: Express.Multer.File;
  fileQrCodeCN?: Express.Multer.File;
}


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

    @Expose()
    @IsOptional()
    @IsString()
    source?: string;

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
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch {
                return [];
            }
        }
        return value;
    })
    tagIds?: string[];

}


