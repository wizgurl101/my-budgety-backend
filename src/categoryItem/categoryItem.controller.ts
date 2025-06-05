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
import { CategoryItemService } from './categoryItem.service';

@Controller('categoryItem')
export class CategoryItemController {
  constructor(private readonly categoryItemService: CategoryItemService) {}

  @Get()
  async findAllbyCategory(@Query('categoryId') categoryId: string) {
    return this.categoryItemService.findAllByCategory(categoryId);
  }

  @Post()
  async create(
    @Body('categoryId') categoryId: string,
    @Body('name') itemName: string,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
  ) {
    return this.categoryItemService.create(
      categoryId,
      itemName,
      startDate,
      endDate,
    );
  }

  @Put(`:id`)
  async update(
    @Param('id') categoryItemId: string,
    @Body('categoryId') categoryId: string,
    @Body('updatedName') updatedName: string,
  ) {
    return this.categoryItemService.update(
      categoryId,
      categoryItemId,
      updatedName,
    );
  }

  @Delete(`:id`)
  async delete(@Param('id') categoryItemId: string) {
    return this.categoryItemService.delete(categoryItemId);
  }
}
