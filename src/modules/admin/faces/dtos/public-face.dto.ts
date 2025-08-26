// dto/public-face.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { FaceEntity } from "src/modules/core/faces/entitys/face.entity";

export class PublicFaceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: () => [String] })
  tags: string[];

  constructor(entity: FaceEntity) {
    this.id = entity.id;
    this.title = entity.title;
    this.tags = entity.tags?.map(t => t.slug) ?? [];
  }
}
