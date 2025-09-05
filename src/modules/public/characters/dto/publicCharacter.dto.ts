import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsString } from 'class-validator';

export class PublicCharacterDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    slug: string;

    @ApiProperty({ type: String })
    @Expose()
    @IsString()
    @Transform(({ obj, value }) => {
        return obj.avatar.url
    })
    avatar: string;
}
