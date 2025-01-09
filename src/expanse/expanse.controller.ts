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

  @Get('currentMonth')
  async getCurrentMonthExpanses(@Body('userId') userId: string,
                                @Body('firstDayOfMonthDate') firstDayOfMonthDate: string,
                                @Body('lastDayOfMonthDate') lastDayOfMonthDate: string) {
    return this.expanseService.getCurrentMonthExpanses(userId,
      firstDayOfMonthDate, lastDayOfMonthDate);
  }

  @Post()
  async create(
    @Body('categoryId') categoryId: string,
    @Body('date') date: string,
    @Body('name') name: string,
    @Body('amount') amount: number,
  ) {
    return this.expanseService.create(categoryId, date, name, amount);
  }

  @Put(':id')
  async update(
    @Param('id') expanseId: string,
    @Body('updatedCategoryId') updatedCategoryId: string,
    @Body('updatedDate') updatedDate: string,
    @Body('updatedName') updatedName: string,
    @Body('updatedAmount') updatedAmount: number,
  ) {
    return this.expanseService.update(
      expanseId,
      updatedCategoryId,
      updatedDate,
      updatedName,
      updatedAmount,
    );
  }

  @Delete(':id')
  async delete(@Param('id') expanseId: string) {
    return this.expanseService.delete(expanseId);
  }
}
