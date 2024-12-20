import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.categoryService.findAll(userId);
  }

  @Post()
  async create(
    @Body('userId') userId: string,
    @Body('categoryName') categoryName: string,
  ) {
    return this.categoryService.create(userId, categoryName);
  }

  @Put(':id')
  async update(
    @Param('id') categoryId: string,
    @Body('updatedName') updatedName: string,
  ) {
    return this.categoryService.update(categoryId, updatedName);
  }

  @Delete(':id')
  async delete(@Param('id') categoryId: string) {
    return this.categoryService.delete(categoryId);
  }
}
