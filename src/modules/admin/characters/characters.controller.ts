import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Body,
    UseInterceptors,
    UploadedFile,
    ParseFilePipeBuilder,
    HttpStatus
} from '@nestjs/common';
import { CharactersService } from 'src/modules/core/characters/characters.service';
import { CreateCharacterDto, DataCharacterDto, UpdateCharacterDto } from '../../core/characters/dtos';
import { FileInterceptor } from "@nestjs/platform-express";
import { ParamsIdDto } from 'src/common/dtos/ParamsId.dto';

@Controller('admin/characters')
export class AdminCharactersController {
    constructor(
        private readonly charactersService: CharactersService,
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() data: CreateCharacterDto, @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'image'
            })
            .addMaxSizeValidator({ maxSize: 2_000_000 })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) file: Express.Multer.File,) {
        return await this.charactersService.create(data, file);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('avatar'))
    update(
        @Param() params: ParamsIdDto,
        @Body() data: UpdateCharacterDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: 'image' })
                .addMaxSizeValidator({ maxSize: 2_000_000 })
                .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
        )
        avatar?: Express.Multer.File,
    ): Promise<DataCharacterDto> {
        const { id } = params
        return this.charactersService.update(id, data, avatar);
    }
}
