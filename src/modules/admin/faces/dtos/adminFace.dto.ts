import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { DataFileDto } from "src/modules/core/object-storage/dtos/dataFile.dto";
import { DataTagDto } from "src/modules/core/tags/dtos";
import { DataCharacterDto } from "src/modules/core/characters/dtos";
import { DataCategoryDto } from "src/modules/core/categories/dtos";

export class AdminFaceDto2 {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty({ required: false })
  @Expose()
  description?: string;

  @ApiProperty({ required: false })
  @Expose()
  source?: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: () => DataCharacterDto })
  @Expose()
  @Type(() => DataCharacterDto)
  character: DataCharacterDto;

  @ApiProperty({ type: () => [DataCategoryDto] })
  @Expose()
  @Type(() => DataCategoryDto)
  categories: DataCategoryDto[];

  @ApiProperty({ type: () => [DataTagDto] })
  @Expose()
  @Type(() => DataTagDto)
  tags: DataTagDto[];

  @ApiProperty({ type: () => [DataFileDto] })
  @Expose()
  @Type(() => DataFileDto)
  imageReviews: DataFileDto[];

  @ApiProperty({ type: () => DataFileDto, required: false })
  @Expose()
  @Type(() => DataFileDto)
  qrCodeCN?: DataFileDto;

  @ApiProperty({ type: () => DataFileDto, required: false })
  @Expose()
  @Type(() => DataFileDto)
  qrCodeGlobals?: DataFileDto;
}
