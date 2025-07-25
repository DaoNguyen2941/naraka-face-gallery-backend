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
import { CategoryService } from 'src/modules/core/categories/category.service';
import { CreateCategoryDto, UpdateCategoryDto, DataCategoryDto } from 'src/modules/core/categories/dtos';

@Controller('admin/category')
export class AdminCategoryController {
    constructor(
        private readonly categoriesService: CategoryService,
    ) { }

    @Get()
    async getList() {
        return await this.categoriesService.findAll()
    }

    @Post()
    @UseInterceptors(FileInterceptor('cover_photo'))
    async create(
        @Body() data: CreateCategoryDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'image'
                })
                .addMaxSizeValidator({ maxSize: 2_000_000 })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                }),
        ) cover_photo: Express.Multer.File,) {
        return await this.categoriesService.create(data, cover_photo);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('cover_photo'))
    update(
        @Param() params: ParamsIdDto,
        @Body() data: UpdateCategoryDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: 'image' })
                .addMaxSizeValidator({ maxSize: 2_000_000 })
                .build({
                     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                     fileIsRequired: false,
                     }),
        )
        cover_photo?: Express.Multer.File,
    ): Promise<DataCategoryDto> {
        const { id } = params
        return this.categoriesService.update(id, data, cover_photo);
    }

    @Delete(':id')
    delete(@Param() params: ParamsIdDto,) {
        const { id } = params
        return this.categoriesService.remove(id)
    }

}
