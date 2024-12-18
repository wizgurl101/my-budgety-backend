import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UuidService } from "../utils/uuid/uuid.service";
import {BigQueryService} from "../db/bigQuery/bigquery.service";

@Injectable()
export class KeywordService
{
    private readonly projectId = this.configService.get<string>('PROJECT_ID')
    private readonly projectName = this.configService.get<string>('PROJECT_NAME')

    constructor(private configService: ConfigService,
                private bigQueryService: BigQueryService,
                private uuidService: UuidService) {
    }

    async create(categoryId: string, name: string)
    {
        const keywordId = this.uuidService.generate();
        const query = `INSERT INTO ${this.projectId}.${this.projectName}.keywords `
            + `(keyword_id, category_id, name) VALUES `
            + `('${keywordId}', '${categoryId}', '${name}')`;
        try
        {
            await this.bigQueryService.query(query);
            return "new keyword added"
        } catch (error)
        {
            console.log(error)
            return "failed to add new keyword"
        }
    }

    async update(id: string, updatedName: string)
    {
        const query = `UPDATE ${this.projectId}.${this.projectName}.keywords `
            + `SET name = '${updatedName}' WHERE keyword_id = '${id}'`;

        try
        {
            await this.bigQueryService.query(query);
            return "keyword updated"
        } catch (error)
        {
            console.log(error)
            return "failed to update keyword"
        }
    }

    async findOne(id: string)
    {
        const query = `SELECT name FROM ${this.projectId}.${this.projectName}.keywords `
            + `WHERE keyword_id = '${id}'`;
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
        const query = `SELECT ROW_NUMBER() OVER() AS id, k.category_id, k.keyword_id, k.name `
            + `FROM ${this.projectId}.${this.projectName}.keywords k `
            + `JOIN ${this.projectId}.${this.projectName}.category c `
            + `ON k.category_id = c.category_id `
            + `WHERE user_id = '${userId}'`;

        try
        {
            return await this.bigQueryService.query(query);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async delete(id: string)
    {
        const query = `DELETE FROM ${this.projectId}.${this.projectName}.keywords `
            + `WHERE keyword_id = '${id}'`;

        try
        {
            await this.bigQueryService.query(query);
            return "keyword deleted"
        } catch (error)
        {
            console.log(error)
            return "failed to delete keyword"
        }
    }
}