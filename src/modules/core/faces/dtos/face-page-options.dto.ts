import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsIn } from "class-validator";
import { PageOptionsDto } from "src/common/dtos";
import { Transform } from 'class-transformer';

export class FacePageOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({
    type: [String],
    description: "Filter by tag slugs (accepts ?tagSlugs=funny&tagSlugs=samurai or ?tagSlugs=funny,samurai)",
    example: ["funny", "samurai"],
  })

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  readonly tagSlugs?: string[];

  @ApiPropertyOptional({
    type: String,
    description: "Filter by character slug",
    example: "viper",
  })
  @IsOptional()
  @IsString()
  readonly characterSlug?: string;

  @ApiPropertyOptional({
    type: String,
    description: "",
    example: "name",
  })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiPropertyOptional({
    type: String,
    description: "Sort face: 'new' = mới cập nhật, 'hot' = nhiều view nhất",
    example: "new",
  })
  @IsOptional()
  @IsIn(['new', 'hot'])
  readonly sort?: 'new' | 'hot';

}
