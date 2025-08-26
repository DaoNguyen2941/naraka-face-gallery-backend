import { ApiProperty } from "@nestjs/swagger";
import { FaceEntity } from "src/modules/core/faces/entitys/face.entity";

export class AdminFaceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ type: () => [String] })
  tags: string[];

  @ApiProperty()
  character: string;

  @ApiProperty()
  createdAt: Date;

  constructor(entity: FaceEntity) {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.tags = entity.tags?.map(t => t.slug) ?? [];
    this.character = entity.character?.name ?? null;
    this.createdAt = entity.createdAt;
  }
}
