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
import { MonthlyBudgetService } from './monthlyBudget.service';

@Controller('monthlyBudget')
export class MonthlyBudgetController {
  constructor(private readonly monthlyBudgetService: MonthlyBudgetService) {}

  @Post()
  async create(
    @Body('userId') userId: string,
    @Body('year') year: number,
    @Body('month') month: number,
    @Body('budget_amount') budgetAmount: number,
  ) {
    return this.monthlyBudgetService.create(userId, year, month, budgetAmount);
  }

  @Get('amount')
  async getMonthBudget(
    @Query('userId') userId: string,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.monthlyBudgetService.getMonthBudget(userId, year, month);
  }

  @Put('updateAmount')
  async updateMonthBudget(
    @Body('userId') userId: string,
    @Body('year') year: number,
    @Body('month') month: number,
    @Body('budget_amount') budgetAmount: number,
  ) {
    return this.monthlyBudgetService.updateMonthBudget(userId, year, month, budgetAmount);
  }
}