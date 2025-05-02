import { Controller, Get, Query } from '@nestjs/common';
import { GamesSpentAmountService } from './gamesSpentAmount.service';

@Controller('gamesSpentAmount')
export class GamesSpentAmountController {
  constructor(
    private readonly gamesSpentAmountService: GamesSpentAmountService,
  ) {}

  @Get('ladsYearAmount')
  async getLadsYearAmount(@Query('year') year: string) {
    return this.gamesSpentAmountService.getLadsYearSpentAmount(year);
  }
}
