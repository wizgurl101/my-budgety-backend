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
import { KeywordService } from './keyword.service';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get(':id')
  async findOne(@Param('id') keywordId: string) {
    return this.keywordService.findOne(keywordId);
  }

  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.keywordService.findAll(userId);
  }

  @Get('byCategory/:categoryId')
  async findAllByCategoryId(@Param('categoryId') categoryId: string) {
    return this.keywordService.findAllByCategoryId(categoryId);
  }

  @Post()
  async create(
    @Body('categoryId') categoryId: string,
    @Body('name') name: string,
  ) {
    return this.keywordService.create(categoryId, name);
  }

  @Put(':id')
  async update(
    @Param('id') keywordId: string,
    @Body('updatedName') updatedName: string,
  ) {
    return this.keywordService.update(keywordId, updatedName);
  }

  @Delete(':id')
  async delete(@Param('id') keywordId: string) {
    return this.keywordService.delete(keywordId);
  }
}
