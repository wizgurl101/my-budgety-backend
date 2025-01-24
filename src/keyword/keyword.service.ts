import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UuidService } from '../utils/uuid/uuid.service';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { Keyword } from './interfaces/keyword.interface';

@Injectable()
export class KeywordService {
  private readonly projectId = this.configService.get<string>('PROJECT_ID');
  private readonly projectName = this.configService.get<string>('PROJECT_NAME');

  constructor(
    private configService: ConfigService,
    private bigQueryService: BigQueryService,
    private uuidService: UuidService,
  ) {}

  async create(categoryId: string, name: string) {
    const keywordId = this.uuidService.generate();
    const query =
      `INSERT INTO ${this.projectId}.${this.projectName}.keywords ` +
      `(keyword_id, category_id, name) VALUES ` +
      `(@keyword_id, @category_id, @name)`;

    const params = {
      keyword_id: keywordId,
      category_id: categoryId,
      name: name.toLowerCase(),
    };
    try {
      await this.bigQueryService.query(query, params);
      return { message: 'new keyword added' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to add new keyword' };
    }
  }

  async update(id: string, updatedName: string) {
    const query =
      `UPDATE ${this.projectId}.${this.projectName}.keywords ` +
      `SET name = @updated_name WHERE keyword_id = @keyword_id`;

    const params = {
      updated_name: updatedName.toLowerCase(),
      keyword_id: id,
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'keyword updated' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to update keyword' };
    }
  }

  async findOne(id: string) {
    const query =
      `SELECT name FROM ${this.projectId}.${this.projectName}.keywords ` +
      `WHERE keyword_id = '${id}'`;
    try {
      return await this.bigQueryService.query(query);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findAll(userId: string) {
    const query =
      `SELECT ROW_NUMBER() OVER() AS id, k.category_id, k.keyword_id, k.name ` +
      `FROM ${this.projectId}.${this.projectName}.keywords k ` +
      `JOIN ${this.projectId}.${this.projectName}.category c ` +
      `ON k.category_id = c.category_id ` +
      `WHERE user_id = '${userId}'`;

    try {
      return await this.bigQueryService.query(query);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findAllByCategoryId(categoryId: string): Promise<Keyword[]> {
    const query =
      `SELECT ROW_NUMBER() OVER() AS id, category_id, keyword_id, name ` +
      `FROM ${this.projectId}.${this.projectName}.keywords ` +
      `WHERE category_id = @category_id`;

    const params = { category_id: categoryId };
    const keywordList: Keyword[] = [];
    try {
      const data = await this.bigQueryService.query(query, params);
      for (const keyword of data) {
        const temp: Keyword = {
          id: keyword.id,
          category_id: keyword.category_id,
          keyword_id: keyword.keyword_id,
          name: keyword.name,
        };

        keywordList.push(temp);
      }
      return keywordList;
    } catch (error) {
      console.log(error);
      return keywordList;
    }
  }

  async delete(id: string) {
    const query =
      `DELETE FROM ${this.projectId}.${this.projectName}.keywords ` +
      `WHERE keyword_id = '${id}'`;

    try {
      await this.bigQueryService.query(query);
      return { message: 'keyword deleted' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to delete keyword' };
    }
  }
}
