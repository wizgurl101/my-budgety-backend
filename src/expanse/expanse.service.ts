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

  async create(categoryId: string, date: string, name: string, amount: number)
  {
    const expanseId = this.uuidService.generate();
    const query = `INSERT INTO ${this.projectId}.${this.projectName}.expanse ` +
        `(expanse_id, category_id, name, date, amount) VALUES ` +
        `('${expanseId}' , '${categoryId}', '${name}', '${date}', ${amount})`;

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

  //todo debug this update query -- Error Invaild query
  // async update(expanseId: string ,categoryId: string, date: string, name: string, amount: number)
  // {
  //   const query = `UPDATE ${this.projectId}.${this.projectName}.expanse `
  //     + `SET category_id = '${categoryId}', date = '${date}', name = '${name}', amount = ${amount} `
  //     + `WHERE expanse_id = '${expanseId}'`;
  //
  //   try
  //   {
  //     console.log(query)
  //     // await this.bigQueryService.query(query);
  //     return "expanse updated"
  //   } catch (error)
  //   {
  //     console.log(error)
  //     return "failed to update expanse"
  //   }
  // }

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