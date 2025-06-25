import { CreateCharacterDto } from './createCharacter.dto';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class DataCharacterDto extends CreateCharacterDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    avatar: string
}