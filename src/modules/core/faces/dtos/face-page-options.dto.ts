import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
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
}
