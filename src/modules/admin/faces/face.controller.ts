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

@Controller('admin/face')
export class AdminFaceController {
    constructor(
        private readonly faceService: FaceService,
    ) { }

    @Get()
    async getList(): Promise<any> {

    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() data: any, @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'image'
            })
            .addMaxSizeValidator({ maxSize: 2_000_000 })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) file: Express.Multer.File,) {
      
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('avatar'))
    update(
        @Param() params: ParamsIdDto,
        @Body() data: any,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: 'image' })
                .addMaxSizeValidator({ maxSize: 2_000_000 })
                .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
        )
        avatar?: Express.Multer.File,
    ) {
     
    }

    @Delete(':id')
    delete(@Param() params: ParamsIdDto,) {
        
    }

}
