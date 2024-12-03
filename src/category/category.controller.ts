import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get(':id')
    async findOne(@Param('id') id: string)
    {
        return this.categoryService.findOne(id);
    }

    @Get()
    async findAll()
    {
        return this.categoryService.findAll();
    }

    @Post()
    async create()
    {
        return this.categoryService.create();
    }

    @Put(':id')
    async update(@Param('id') id: string)
    {
        return this.categoryService.update();
    }

    @Delete(':id')
    async delete(@Param('id') id: string)
    {
        return "delete category";
    }
}