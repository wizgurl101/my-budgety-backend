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
    @Body('budget') budget: number,
  ) {
    return this.monthlyBudgetService.create(userId, year, month, budget);
  }
}