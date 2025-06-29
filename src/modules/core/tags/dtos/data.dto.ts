import { CreateTagDto } from "./create.dto";
import { IsString, } from 'class-validator';
import { Expose } from 'class-transformer';

export class DataTagDto extends CreateTagDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    slug: string

}