import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { DataFileDto } from "src/modules/core/object-storage/dtos/dataFile.dto";
import { IsString } from 'class-validator';
import { DataTagDto } from "src/modules/core/tags/dtos";

export class PublicFaceDetails {
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

  @ApiProperty({ type: String })
  @Expose()
  @IsString()
  @Transform(({ obj, value }) => {
    return obj.character.name
  })
  character: string;

  @ApiProperty({ type: [String] })
  @Expose()
  @Transform(({ obj }) =>
    obj.tags?.map((tag: DataTagDto) => tag.name)
  )
  tags: string[];

  
  @ApiProperty({ type: [String] })
  @Expose()
  @Transform(({ obj }) =>
    obj.imageReviews?.map((file: DataFileDto) => file.url)
  )
  imageReviews: string[];

  @ApiProperty({ type: String })
  @Expose()
  @IsString()
  @Transform(({ obj }) => {
    return obj.qrCodeCN.url
  })
  qrCodeCN?: string;

  @ApiProperty({ type: () => DataFileDto, required: false })
  @Expose()
  @IsString()
  @Transform(({ obj }) => {
    return obj.qrCodeGlobals.url
  })
  qrCodeGlobals?: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;
}
