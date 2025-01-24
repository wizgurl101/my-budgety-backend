import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';

@Injectable()
export class ExpanseService {
  private readonly projectId = this.configService.get<string>('PROJECT_ID');
  private readonly projectName = this.configService.get<string>('PROJECT_NAME');

  constructor(
    private configService: ConfigService,
    private bigQueryService: BigQueryService,
    private uuidService: UuidService,
  ) {}

  async getMonthExpanses(
    userId: string,
    firstDayOfMonthDate: string,
    lastDayOfMonthDate: string,
  ) {
    const query =
      `SELECT ROW_NUMBER() OVER() AS id, e.category_id, c.name AS categoryName, e.expanse_id, e.name, e.date, e.amount, e.card_name ` +
      `FROM ${this.projectId}.${this.projectName}.expanse e ` +
      `JOIN ${this.projectId}.${this.projectName}.category c ` +
      `ON e.category_id = c.category_id ` +
      `WHERE user_id = @user_id ` +
      `AND date >= @firstDayOfMonth_Date `;
    +`AND date <= @lastDayOfMonth_Date`;

    const params = {
      user_id: userId,
      firstDayOfMonth_Date: firstDayOfMonthDate,
      lastDayOfMonth_Date: lastDayOfMonthDate,
    };

    try {
      return await this.bigQueryService.query(query, params);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async get5LatestExpanses(
    userId: string,
    firstDayOfMonthDate: string,
    lastDayOfMonthDate: string,
  ) {
    const query =
      `SELECT ROW_NUMBER() OVER() AS id, e.category_id, c.name AS categoryName, e.expanse_id, e.name, e.date, e.amount, e.card_name ` +
      `FROM ${this.projectId}.${this.projectName}.expanse e ` +
      `JOIN ${this.projectId}.${this.projectName}.category c ` +
      `ON e.category_id = c.category_id ` +
      `WHERE user_id = @user_id ` +
      `AND date >= @firstDayOfMonth_Date ` +
      `AND date <= @lastDayOfMonth_Date ` +
      `ORDER BY e.date DESC ` +
      `LIMIT 5`;

    const params = {
      user_id: userId,
      firstDayOfMonth_Date: firstDayOfMonthDate,
      lastDayOfMonth_Date: lastDayOfMonthDate,
    };

    try {
      return await this.bigQueryService.query(query, params);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getMonthTotal(
    userId: string,
    firstDayOfMonthDate: string,
    lastDayOfMonthDate: string,
  ) {
    const query =
      `SELECT SUM(e.amount) as total ` +
      `FROM ${this.projectId}.${this.projectName}.expanse e ` +
      `JOIN ${this.projectId}.${this.projectName}.category c ` +
      `ON e.category_id = c.category_id ` +
      `WHERE user_id = @user_id ` +
      `AND date >= @firstDayOfMonth_Date ` +
      `AND date <= @lastDayOfMonth_Date`;

    const params = {
      user_id: userId,
      firstDayOfMonth_Date: firstDayOfMonthDate,
      lastDayOfMonth_Date: lastDayOfMonthDate,
    };

    try {
      return await this.bigQueryService.query(query, params);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async create(
    categoryId: string,
    date: string,
    name: string,
    amount: number,
    cardName: string,
  ) {
    const expanseId = this.uuidService.generate();
    const query =
      `INSERT INTO ${this.projectId}.${this.projectName}.expanse ` +
      `(expanse_id, category_id, name, date, amount, card_name) VALUES ` +
      `(@expanse_id , @category_id, @name, @date, @amount, @card_name)`;

    const params = {
      expanse_id: expanseId,
      category_id: categoryId,
      name: name.toLowerCase(),
      date: date,
      amount: amount,
      card_name: cardName.toLowerCase(),
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'new expanse added' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to add new expanse' };
    }
  }

  async update(
    expanseId: string,
    categoryId: string,
    date: string,
    name: string,
    amount: number,
    cardName: string,
  ) {
    const query =
      `UPDATE ${this.projectId}.${this.projectName}.expanse ` +
      `SET category_id = @category_id, date = @date, name = @name, amount = @amount, card_name = @card_name ` +
      `WHERE expanse_id = '${expanseId}'`;

    const params = {
      category_id: categoryId,
      date: date,
      name: name.toLowerCase(),
      amount: amount,
      card_name: cardName.toLowerCase(),
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'expanse updated' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to update expanse' };
    }
  }

  async delete(expenseId: string) {
    const query =
      `DELETE FROM ${this.projectId}.${this.projectName}.expanse ` +
      `WHERE expanse_id = @expanse_id`;

    const params = {
      expanse_id: expenseId,
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'expanse deleted' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to delete expanse' };
    }
  }
}
