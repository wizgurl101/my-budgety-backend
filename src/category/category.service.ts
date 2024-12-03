import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class CategoryService {
    constructor(private configService: ConfigService) {
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

    async findAll()
    {
        return "all categories";
    }

    async delete(id: string)
    {
        return "delete category";
    }
}