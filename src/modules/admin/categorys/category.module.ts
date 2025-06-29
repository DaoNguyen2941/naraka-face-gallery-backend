import { Module } from '@nestjs/common';
import { CategoriesModule } from 'src/modules/core/categories/categorys.module';
import { AdminCategoryController } from './category.controller';

@Module({
  imports: [CategoriesModule],
  controllers: [AdminCategoryController],
})
export class AdminCategoryModule {}
