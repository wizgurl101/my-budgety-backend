import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';

@Injectable()
export class SubCategoryService {
  private readonly projectId = this.configService.get<string>('PROJECT_ID');
  private readonly projectName = this.configService.get<string>('PROJECT_NAME');

  constructor(
    private configService: ConfigService,
    private bigQueryService: BigQueryService,
    private uuidService: UuidService,
  ) {}

  async create(categoryId: string, name: string) {
    const subCategoryId = this.uuidService.generate();
    const query =
      `INSERT INTO ${this.projectId}.${this.projectName}.subCategory ` +
      `(category_id, sub_category_id, name) VALUES ` +
      `(@category_id, @sub_category_id, @name)`;

    const params = {
      category_id: categoryId,
      sub_category_id: subCategoryId,
      name: name.toLowerCase(),
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'new sub-category added' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to add new sub-category' };
    }
  }

  async update(categoryId: string, subCategoryId: string, updatedName: string) {
    const query =
      `UPDATE ${this.projectId}.${this.projectName}.subCategory ` +
      `SET name = @updated_name, category_id = @category_id WHERE sub_category_id = @sub_category_id`;

    const params = {
      updated_name: updatedName.toLowerCase(),
      category_id: categoryId,
      sub_category_id: subCategoryId,
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'sub-category updated' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to update sub-category' };
    }
  }

  async delete(subcategoryId: string) {
    const query =
      `DELETE FROM ${this.projectId}.${this.projectName}.subCategory ` +
      `WHERE sub_category_id = @sub_category_id`;

    const params = { sub_category_id: subcategoryId };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'sub-category deleted' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to delete sub-category' };
    }
  }

  async findAllByCategory(categoryId: string) {
    const query =
      `SELECT ROW_NUMBER() OVER() AS id, sub_category_id, name FROM ${this.projectId}.${this.projectName}.subCategory ` +
      `WHERE category_id = @category_id`;

    const params = { category_id: categoryId };

    try {
      return await this.bigQueryService.query(query, params);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
