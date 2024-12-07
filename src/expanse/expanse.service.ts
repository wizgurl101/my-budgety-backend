import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from "../utils/uuid/uuid.service";

@Injectable()
export class ExpanseService
{
  private readonly projectId = this.configService.get<string>('PROJECT_ID')
  private readonly projectName = this.configService.get<string>('PROJECT_NAME')

  constructor(private configService: ConfigService,
              private bigQueryService: BigQueryService,
              private uuidService: UuidService) {
  }

  async create(userId: string, categoryId: string, name: string, date: date,
               amount: number)
  {
    const expanseId = this.uuidService.generate();
    const bigqueryTimestamp = this.bigQueryService.timestamp(date);
    const query = `INSERT INTO ${this.projectId}.${this.projectName}.expanse ` +
        `(expanse_id, category_id, name, date, amount, user_id) VALUES ` +
        `('${expanseId}' , '${categoryId}', '${name}', '${bigqueryTimestamp}', ${amount}, '${userId})`;

    try
    {
        await this.bigQueryService.query(query);
        return "new expanse added"
      } catch (error)
      {
        console.log(error)
        return "failed to add new expanse"
      }
  }

  async update(expenseId: string ,name: string, amount: number)
  {
    const query = `UPDATE ${this.projectId}.${this.projectName}.expanse ` +
        `SET name = '${name}', amount = ${amount} WHERE expanse_id = '${expanseId}'`;

    try
    {
      await this.bigQueryService.query(query);
      return "expanse updated"
    } catch (error)
    {
      console.log(error)
      return "failed to update expanse"
    }
  }

  async updateCategory(expenseId: string, categoryId: string)
  {
    const query = `UPDATE ${this.projectId}.${this.projectName}.expanse ` +
        `SET category_id = '${categoryId}' WHERE expanse_id = '${expenseId}'`;

    try
    {
      await this.bigQueryService.query(query);
      return "expanse's category updated"
    } catch (error)
    {
      console.log(error)
      return "failed to update expanse's category"
    }
  }

  async delete(expenseId: string)
  {
    const query = `DELETE FROM ${this.projectId}.${this.projectName}.expanse ` +
        `WHERE expanse_id = '${expenseId}'`;

    try
    {
      await this.bigQueryService.query(query);
      return "expanse deleted"
    } catch (error)
    {
      console.log(error)
      return "failed to delete expanse"
    }
  }
}