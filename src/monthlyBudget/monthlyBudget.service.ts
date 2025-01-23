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
      budget,
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'new monthly budget added' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to add new monthly budget' };
    }
  }

  async getMonthBudget(userId: string, year: number, month: number) {
    const query =
      `SELECT budget_amount ` +
      `FROM ${this.projectId}.${this.projectName}.monthlyBudget ` +
      `WHERE user_id = '${userId}' ` +
      `AND year = ${year} ` +
      `AND month = ${month}`;

    try {
      return await this.bigQueryService.query(query);
    } catch (error) {
      console.log(error);
      return { message: 'failed to get monthly budget amount' };
    }
  }

  async updateMonthBudget(
    userId: string,
    year: number,
    month: number,
    budgetAmount: number,
  ) {
    const query =
      `UPDATE ${this.projectId}.${this.projectName}.monthlyBudget ` +
      `SET budget_amount = @budget_amount ` +
      `WHERE user_id = @user_id ` +
      `AND year = @year ` +
      `AND month = @month`;

    const params = {
      user_id: userId,
      year: year,
      month: month,
      budget_amount: budgetAmount,
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'monthly budget amount updated' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to update monthly budget amount' };
    }
  }
}
