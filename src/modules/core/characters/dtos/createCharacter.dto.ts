import { IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateCharacterDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;
}
