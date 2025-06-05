import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';

@Injectable()
export class CategoryItemService {
  private readonly projectId = this.configService.get<string>('PROJECT_ID');
  private readonly projectName = this.configService.get<string>('PROJECT_NAME');

  constructor(
    private configService: ConfigService,
    private bigQueryService: BigQueryService,
    private uuidService: UuidService,
  ) {}

  async create(
    categoryId: string,
    itemName: string,
    startDate: string,
    endDate: string,
  ) {
    const categoryItemId = this.uuidService.generate();
    const query =
      `INSERT INTO ${this.projectId}.${this.projectName}.categoryItem ` +
      `(category_id, category_item_id, name, start_date, end_date) VALUES ` +
      `(@category_id, @category_item_id, @name, @start_date, @end_date)`;

    const params = {
      category_id: categoryId,
      category_item_id: categoryItemId,
      start_date: startDate,
      end_date: endDate,
      name: itemName.toLowerCase(),
    };
    try {
      await this.bigQueryService.query(query, params);
      return { message: 'new category item added' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to add new category item' };
    }
  }

  async update(
    categoryId: string,
    categoryItemId: string,
    updatedName: string,
  ) {
    const query =
      `UPDATE ${this.projectId}.${this.projectName}.categoryItem ` +
      `SET name = @updated_name, category_id = @category_id WHERE category_item_id = @category_item_id`;

    const params = {
      updated_name: updatedName.toLowerCase(),
      category_id: categoryId,
      category_item_id: categoryItemId,
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'category item updated' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to update category item' };
    }
  }

  async findAllByCategory(categoryId: string) {
    const query =
      `SELECT ROW_NUMBER() OVER() AS id, category_item_id, name FROM ${this.projectId}.${this.projectName}.categoryItem ` +
      `WHERE category_id = @category_id`;

    const params = { category_id: categoryId };

    try {
      return await this.bigQueryService.query(query, params);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async delete(categoryItemId: string) {
    const query =
      `DELETE FROM ${this.projectId}.${this.projectName}.categoryItem ` +
      `WHERE category_item_id = @category_item_id`;

    const params = { category_item_id: categoryItemId };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'category item deleted' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to delete category item' };
    }
  }
}
