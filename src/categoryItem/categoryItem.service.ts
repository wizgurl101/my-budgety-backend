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

  // async create(categoryId: string, itemName: string) {
  //   const categoryItemId = this.uuidService.generate();
  //   const query =
  //     `INSERT INTO ${this.projectId}.${this.projectName}.category ` +
  //     `(category_id, user_id, name) VALUES ` +
  //     `(@category_id, @user_id, @category_name)`;

  //   return { message: 'CategoryItemService create method not implemented' };
  // }

  // async update() {
  //   return { message: 'CategoryItemService update method not implemented' };
  // }

  // async findAll() {
  //   return { message: 'CategoryItemService findAll method not implemented' };
  // }

  // async delete(categoryItemId: string) {
  //   return { message: 'CategoryItemService delete method not implemented' };
  // }
}
