import { Controller, Get, Post, Put, Delete, Param, Query, Body } from "@nestjs/common";
import { ExpanseService } from "./expanse.service";

@Controller('expanse')
export class ExpanseController
{
  constructor(private readonly expanseService: ExpanseService) {}

  @Post()
  async create(@Body('userId') userId: string, @Body('categoryId') categoryId: string,
               @Body('name') name: string, @Body('amount') amount: number)
  {
    return this.expanseService.create(userId, categoryId, name, amount)
  }

  @Put(':id')
  async update(@Param('id') expanseId: string, @Body('updatedName') updatedName,
               @Body('updatedAmount') updatedAmount: number)
  {
    return this.expanseService.update(expanseId, updatedName, updatedAmount)
  }

  @Put(':id/updateCategory')
  async updateCategory(@Param('id') expanseId: string, @Body('categoryId') categoryId: string)
  {
    return this.expanseService.updateCategory(expanseId, categoryId)
  }

  @Delete(':id')
  async delete(@Param('id') expanseId: string)
  {
    return this.expanseService.delete(expanseId)
  }
}