import { CreateCharacterDto } from './createCharacter.dto';
import { IsString, } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { DataFileDto } from '../../object-storage/dtos/dataFile.dto';
export class DataCharacterDto extends CreateCharacterDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @Type(() => DataFileDto) 
    avatar: DataFileDto;
}