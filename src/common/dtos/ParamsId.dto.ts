import { IsUUID } from 'class-validator';

export class ParamsIdDto {
  @IsUUID()
  id: string;
}
