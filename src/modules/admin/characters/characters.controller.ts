import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseInterceptors,
    UploadedFile,
    ParseFilePipeBuilder,
    HttpStatus
} from '@nestjs/common';
import { CharactersService } from 'src/modules/core/characters/characters.service';
import { CreateCharacterDto, UpdateCharacterDto } from '../../core/characters/dtos';
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('admin/characters')
export class AdminCharactersController {
    constructor(
        private readonly charactersService: CharactersService,
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body()data: CreateCharacterDto, @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'image'
            })
            .addMaxSizeValidator({ maxSize: 2_000_000 })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) file: Express.Multer.File,) {
        return await this.charactersService.create(data,file);
    }
}
