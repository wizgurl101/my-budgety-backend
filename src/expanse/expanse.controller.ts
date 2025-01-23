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
import { ExpanseService } from './expanse.service';

@Controller('expanse')
export class ExpanseController {
  constructor(private readonly expanseService: ExpanseService) {}

  @Get('month')
  async getMonthExpanses(
    @Query('userId') userId: string,
    @Query('firstDayOfMonthDate') firstDayOfMonthDate: string,
    @Query('lastDayOfMonthDate') lastDayOfMonthDate: string,
  ) {
    return this.expanseService.getMonthExpanses(
      userId,
      firstDayOfMonthDate,
      lastDayOfMonthDate,
    );
  }

  @Post()
  async create(
    @Body('categoryId') categoryId: string,
    @Body('date') date: string,
    @Body('name') name: string,
    @Body('amount') amount: number,
    @Body('cardName') cardName: string,
  ) {
    return this.expanseService.create(categoryId, date, name, amount, cardName);
  }

  @Put(':id')
  async update(
    @Param('id') expanseId: string,
    @Body('updatedCategoryId') updatedCategoryId: string,
    @Body('updatedDate') updatedDate: string,
    @Body('updatedName') updatedName: string,
    @Body('updatedAmount') updatedAmount: number,
    @Body('updatedCardName') updatedCardName: string,
  ) {
    return this.expanseService.update(
      expanseId,
      updatedCategoryId,
      updatedDate,
      updatedName,
      updatedAmount,
      updatedCardName,
    );
  }

  @Delete(':id')
  async delete(@Param('id') expanseId: string) {
    return this.expanseService.delete(expanseId);
  }

  @Get('monthTotal')
  async getMonthTotal(
    @Query('userId') userId: string,
    @Query('firstDayOfMonthDate') firstDayOfMonthDate: string,
    @Query('lastDayOfMonthDate') lastDayOfMonthDate: string,
  ) {
    return this.expanseService.getMonthTotal(
      userId,
      firstDayOfMonthDate,
      lastDayOfMonthDate,
    );
  }

  @Get('monthLatest5')
  async getMonthLatest5(
    @Query('userId') userId: string,
    @Query('firstDayOfMonthDate') firstDayOfMonthDate: string,
    @Query('lastDayOfMonthDate') lastDayOfMonthDate: string,
  ) {
    return this.expanseService.get5LatestExpanses(
      userId,
      firstDayOfMonthDate,
      lastDayOfMonthDate,
    );
  }
}
