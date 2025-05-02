import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';

@Injectable()
export class GamesSpentAmountService {
  private readonly projectId = this.configService.get<string>('PROJECT_ID');
  private readonly projectName = this.configService.get<string>('PROJECT_NAME');

  constructor(
    private configService: ConfigService,
    private bigQueryService: BigQueryService,
  ) {}

  async getLadsYearSpentAmount(userId: string, year: string) {
    console.log('userId', userId);
    console.log('year', year);
    return 0;
  }
}
