import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create.dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}