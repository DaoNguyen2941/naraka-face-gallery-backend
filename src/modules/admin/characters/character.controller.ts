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
    HttpStatus,
    Request,
    Req,
    Ip,
} from '@nestjs/common';
import { CharactersService } from 'src/modules/core/characters/characters.service';
import { CreateCharacterDto, DataCharacterDto, UpdateCharacterDto } from '../../core/characters/dtos';
import { FileInterceptor } from "@nestjs/platform-express";
import { ParamsIdDto } from 'src/common/dtos/ParamsId.dto';
import { CustomAdminInRequest } from '../dtos/customAdminInRequest.dto';

@Controller('admin/characters')
export class AdminCharactersController {
    constructor(
        private readonly charactersService: CharactersService,
    ) { }

    @Get()
    async getList(): Promise<DataCharacterDto[]> {
        return await this.charactersService.findAll()
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() data: CreateCharacterDto, @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'image'
                })
                .addMaxSizeValidator({ maxSize: 10_000_000 })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                }),
        ) file: Express.Multer.File,
        @Request() request: CustomAdminInRequest,
        @Req() req: Request,
        @Ip() ip: string,
    ): Promise<DataCharacterDto> {
        const admin = request.user;

        return await this.charactersService.create(data, file, {
            adminId: admin.id,
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        });
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('avatar'))
    update(
        @Request() request: CustomAdminInRequest,
        @Req() req: Request,
        @Ip() ip: string,
        @Param() params: ParamsIdDto,
        @Body() data: UpdateCharacterDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: 'image' })
                .addMaxSizeValidator({ maxSize: 5_000_000 })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    fileIsRequired: false,
                }),
        )
        avatar?: Express.Multer.File,

    ): Promise<DataCharacterDto> {
        const { id } = params
        const admin = request.user;
        const context = {
            adminId: admin.id,
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        }
        return this.charactersService.update(id, data, context, avatar);
    }

    @Delete(':id')
    delete(
        @Param() params: ParamsIdDto,
        @Request() request: CustomAdminInRequest,
        @Req() req: Request,
        @Ip() ip: string,
    ) {
        const { id } = params
        const admin = request.user;
        const context = {
            adminId: admin.id,
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        }
        return this.charactersService.remove(id,context)
    }

}
