import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class AdminProfileDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    username: string;

    @Expose()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}