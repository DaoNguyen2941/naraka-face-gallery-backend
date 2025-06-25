import { IsString, IsOptional } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
