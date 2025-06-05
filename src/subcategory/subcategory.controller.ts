import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { SubCategoryService } from './subcategory.service';

@Controller('subCategory')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get()
  async findAllByCategory(@Query('categoryId') categoryId: string) {
    return this.subCategoryService.findAllByCategory(categoryId);
  }

  @Post()
  async create(
    @Body('categoryId') categoryId: string,
    @Body('name') name: string,
  ) {
    return this.subCategoryService.create(categoryId, name);
  }

  @Put(`:id`)
  async update(
    @Param('id') subCategoryId: string,
    @Body('categoryId') categoryId: string,
    @Body('updatedName') updatedName: string,
  ) {
    return this.subCategoryService.update(
      categoryId,
      subCategoryId,
      updatedName,
    );
  }

  @Delete(`:id`)
  async delete(@Param('id') subCategoryId: string) {
    return this.subCategoryService.delete(subCategoryId);
  }
}
