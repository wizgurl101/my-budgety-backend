import { Controller, Get, Post, Put, Delete, Param, Query } from "@nestjs/common";
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
    async findAll(@Query('userId') userId: string)
    {
        return this.categoryService.findAll(userId);
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