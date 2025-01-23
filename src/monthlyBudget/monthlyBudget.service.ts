import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';

@Injectable()
export class MonthlyBudgetService {
  private readonly projectId = this.configService.get<string>('PROJECT_ID');
  private readonly projectName = this.configService.get<string>('PROJECT_NAME');

  constructor(
    private configService: ConfigService,
    private bigQueryService: BigQueryService,
  ) {}

  async create(userId: string, year: number, month: number, budget: number) {
    const query =
      `INSERT INTO ${this.projectId}.${this.projectName}.monthlyBudget ` +
      `(user_id, year, month, budget_amount, spend_amount) VALUES ` +
      `(@user_id, @year, @month, @budget, 0)`;

    const params = {
      user_id: userId,
      year,
      month,
      budget
    }

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'new monthly budget added' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to add new monthly budget' };
    }
  }
}