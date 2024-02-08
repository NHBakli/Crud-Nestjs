import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './entity/ingredient.entity';
import { CreateIngredientDto } from './dto/CreateIngredientDto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  @Get()
  findAll(): Promise<Ingredient[]> {
    return this.ingredientService.findAll();
  }

  @Post()
  async createIngredient(
    @Body() newIngredient: CreateIngredientDto,
  ): Promise<Ingredient> {
    return await this.ingredientService.create(newIngredient);
  }

  @Patch(':id')
  updateIngredient(
    @Param('id') id: string,
    @Body() ingredient: CreateIngredientDto,
  ) {
    return this.ingredientService.update(id, ingredient);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: string) {
    return this.ingredientService.delete(id);
  }
}
