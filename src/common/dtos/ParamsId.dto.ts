import { IsUUID, IsString } from 'class-validator';

export class ParamsIdDto {
  @IsUUID()
  id: string;
}

export class ParamsSlugDto {
  @IsString()
  slug: string;
}