import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsString, IsNumber } from 'class-validator';

export class PublicFaceDto {
  @ApiProperty()
  @Expose()
  @IsString()
  id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsString()
  slug: string;

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
    obj.imageReviews[0].url
  )
  imageReviews: string[];

  @ApiProperty()
  @Expose()
  @IsNumber()
  views: string;

}
