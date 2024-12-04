import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from "../utils/uuid/uuid.service";

@Injectable()
export class CategoryService
{
    private readonly projectId = this.configService.get<string>('PROJECT_ID')
    private readonly projectName = this.configService.get<string>('PROJECT_NAME')

    constructor(private configService: ConfigService,
                private bigQueryService: BigQueryService,
                private uuidService: UuidService) {
    }

    async create(userId: string, categoryName: string)
    {
        const categoryId = this.uuidService.generate();
        const query = `INSERT INTO ${this.projectId}.${this.projectName}.category `
            + `(category_id, user_id, name) VALUES `
            + `('${categoryId}', '${userId}', '${categoryName}')`;
        try
        {
            await this.bigQueryService.query(query);
            return "new category added"
        } catch (error)
        {
            console.log(error)
            return "failed to add new category"
        }
    }

    async update(categoryId: string, updatedName: string)
    {
        const query = `UPDATE ${this.projectId}.${this.projectName}.category `
        + `SET name = '${updatedName}' WHERE category_id = '${categoryId}'`;

        try
        {
            await this.bigQueryService.query(query);
            return "category updated"
        } catch (error)
        {
            console.log(error)
            return "failed to update category"
        }
    }

    async findOne(id: string)
    {
        const query = `SELECT ROW_NUMBER() OVER() AS id, category_id, name FROM ${this.projectId}.${this.projectName}.category `
            + `WHERE category_id = '${id}'`;
        try
        {
            return await this.bigQueryService.query(query);
        } catch (error)
        {
            console.log(error);
            return [];
        }
    }

    async findAll(userId: string)
    {
        const query = `SELECT ROW_NUMBER() OVER() AS id, category_id, name FROM ${this.projectId}.${this.projectName}.category `
            + `WHERE user_id = '${userId}'`;
        try
        {
            return await this.bigQueryService.query(query);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async delete(categoryId: string)
    {
        const query = `DELETE FROM ${this.projectId}.${this.projectName}.category `
            + `WHERE category_id = '${categoryId}'`;

        try
        {
            await this.bigQueryService.query(query);
            return "category deleted"
        } catch (error)
        {
            console.log(error)
            return "failed to delete category"
        }
    }
}