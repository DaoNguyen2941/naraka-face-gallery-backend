import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsString } from 'class-validator';

export class PublicFaceDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
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
}
