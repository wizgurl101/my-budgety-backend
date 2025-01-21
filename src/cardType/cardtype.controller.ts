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
import { CardTypeService } from './cardtype.service';

@Controller('cardtype')
export class CardTypeController {
  constructor(private readonly cardTypeService: CardTypeService) {}

  @Post()
  async create(@Body('userId') userId: string, @Body('name') name: string) {
    return this.cardTypeService.create(userId, name);
  }

  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.cardTypeService.findAll(userId);
  }

  @Put(':id')
  async update(
    @Param('id') cardId: string,
    @Body('updatedName') updatedName: string,
  ) {
    return this.cardTypeService.update(cardId, updatedName);
  }

  @Delete(':id')
  async delete(@Param('id') cardId: string) {
    return this.cardTypeService.delete(cardId);
  }
}
