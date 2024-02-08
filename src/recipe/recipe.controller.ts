import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { Recipe } from './entity/recipe.entity';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/CreateRecipeDto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @Get()
  findAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  @Post()
  async createRecipe(@Body() newRecipe: CreateRecipeDto): Promise<Recipe> {
    return await this.recipeService.create(newRecipe);
  }

  @Patch(':id')
  updateRecipe(@Param('id') id: string, @Body() recipe: CreateRecipeDto) {
    return this.recipeService.update(id, recipe);
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: string) {
    return this.recipeService.delete(id);
  }
}
