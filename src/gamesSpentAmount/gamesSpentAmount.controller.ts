import { Controller, Get, Query } from '@nestjs/common';
import { GamesSpentAmountService } from './gamesSpentAmount.service';

@Controller('gamesSpentAmount')
export class GamesSpentAmountController {
  constructor(
    private readonly gamesSpentAmountService: GamesSpentAmountService,
  ) {}

  @Get()
  async getLadsYearAmount(
    @Query('userId') userId: string,
    @Query('year') year: string,
  ) {
    return this.gamesSpentAmountService.getLadsYearSpentAmount(userId, year);
  }
}
