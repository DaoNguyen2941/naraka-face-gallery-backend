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
import { FileInterceptor } from "@nestjs/platform-express";
import { ParamsIdDto } from 'src/common/dtos/ParamsId.dto';
import { FaceService } from 'src/modules/core/faces/face.service';
import { CreateFaceDto, DataFaceDto, UpdateFaceDto } from 'src/modules/core/faces/dtos';
@Controller('admin/face')
export class AdminFaceController {
    constructor(
        private readonly faceService: FaceService,
    ) { }

    @Get()
    async getList(): Promise<any> {
        return await this.faceService.findAll()
    }

    @Post()
    @UseInterceptors(FileInterceptor('qrCode'))
    async create(@Body() data: CreateFaceDto, @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'image'
            })
            .addMaxSizeValidator({ maxSize: 2_000_000 })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) qrCode: Express.Multer.File,): Promise<DataFaceDto> {
        return this.faceService.create(data, qrCode)
    }

    @Patch(':id')
    update(@Param() params: ParamsIdDto, @Body() data: UpdateFaceDto,
    ) {
        const { id } = params
        return this.faceService.update(id, data)
    }

    @Delete(':id')
    async delete(@Param() params: ParamsIdDto,): Promise<DataFaceDto> {
        const { id } = params
        return await this.faceService.remove(id)
    }

}
