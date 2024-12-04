import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {BigQueryService} from '../db/bigQuery/bigquery.service';

@Injectable()
export class CategoryService {
    private readonly projectId = this.configService.get<string>('PROJECT_ID')
    private readonly projectName = this.configService.get<string>('PROJECT_NAME')

    constructor(private configService: ConfigService,
                private bigQueryService: BigQueryService) {
    }

    async create()
    {
        return "new category";
    }

    async update()
    {
        return "update category";
    }

    async findOne(id: string)
    {
        return this.configService.get<string>('PROJECT_NAME');
    }

    async findAll(userId: string)
    {
        const query = `SELECT ROW_NUMBER() OVER() AS id, category_id, name FROM ${this.projectId}.${this.projectName}.category `
            + `WHERE user_id = '${userId}'`;

        try {
            return await this.bigQueryService.query(query);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async delete(id: string)
    {
        return "delete category";
    }
}