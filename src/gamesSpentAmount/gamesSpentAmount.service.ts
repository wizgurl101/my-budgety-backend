import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';

@Injectable()
export class GamesSpentAmountService {
  private readonly projectId = this.configService.get<string>('PROJECT_ID');
  private readonly projectName = this.configService.get<string>('PROJECT_NAME');
  private readonly love_and_deepspace = 'google*love and deeps';

  constructor(
    private configService: ConfigService,
    private bigQueryService: BigQueryService,
  ) {}

  async getLadsYearSpentAmount(year: string) {
    const query =
      `SELECT SUM(amount) as total ` +
      `FROM ${this.projectId}.${this.projectName}.expanse ` +
      `WHERE date > @current_year_date ` +
      `AND name = @game_name`;

    const params = {
      current_year_date: `${year}-01-01`,
      game_name: this.love_and_deepspace,
    };

    try {
      return await this.bigQueryService.query(query, params);
    } catch (error) {
      console.log(error);
      return [{ total: 0 }];
    }
  }
}
