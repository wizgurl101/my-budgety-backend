import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';

@Injectable()
export class CardTypeService {
  private readonly projectId = this.configService.get<string>('PROJECT_ID');
  private readonly projectName = this.configService.get<string>('PROJECT_NAME');

  constructor(
    private configService: ConfigService,
    private bigQueryService: BigQueryService,
    private uuidService: UuidService,
  ) {}

  async create(userId: string, name: string) {
    const cardId = this.uuidService.generate();
    const query =
      `INSERT INTO ${this.projectId}.${this.projectName}.cards ` +
      `(user_id, name, card_id) VALUES ` +
      `(@user_Id, @card_name, @card_id)`;

    const params = {
      user_Id: userId,
      card_name: name.toLowerCase(),
      card_id: cardId,
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'new card added' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to add new card' };
    }
  }

  async findAll(userId: string) {
    const query =
      `SELECT ROW_NUMBER() OVER() AS id, card_id, name ` +
      ` FROM ${this.projectId}.${this.projectName}.cards ` +
      `WHERE user_id = @user_Id`;

    const params = {
      user_Id: userId,
    };

    try {
      return await this.bigQueryService.query(query, params);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async update(cardId: string, updatedName: string) {
    const query =
      `UPDATE ${this.projectId}.${this.projectName}.cards ` +
      `SET name = @updated_name WHERE card_id = @card_Id`;

    const params = {
      updated_name: updatedName,
      card_Id: cardId,
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'card updated' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to update card' };
    }
  }

  async delete(cardId: string) {
    const query =
      `DELETE FROM ${this.projectId}.${this.projectName}.cards ` +
      `WHERE card_id = @card_Id`;

    const params = {
      card_Id: cardId,
    };

    try {
      await this.bigQueryService.query(query, params);
      return { message: 'card deleted' };
    } catch (error) {
      console.log(error);
      return { message: 'failed to delete card' };
    }
  }
}
