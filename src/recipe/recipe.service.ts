import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entity/recipe.entity';
import { CreateRecipeDto } from './dto/CreateRecipeDto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository,
  ) {}

  findOne(id: string) {
    try {
      return this.recipeRepository.find({ where: { id: +id } });
    } catch {
      ('Recipe not found');
    }
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    if (!['breakfast', 'lunch', 'dinner'].includes(createRecipeDto.type)) {
      throw new BadRequestException(
        'Invalid recipe type, choose between breakfast, lunch, dinner',
      );
    }

    const newRecipe = this.recipeRepository.create(createRecipeDto);
    return this.recipeRepository.save(newRecipe);
  }

  async update(id: string, updatedRecipe: Partial<Recipe>): Promise<Recipe> {
    const recipeToUpdate = await this.recipeRepository.findOne({
      where: { id: +id },
    });
    if (!recipeToUpdate) {
      throw new NotFoundException('Recipe not found');
    }

    Object.assign(recipeToUpdate, updatedRecipe);

    return await this.recipeRepository.save(recipeToUpdate);
  }

  async delete(id: string): Promise<{ deletedRecipe: number }> {
    const isIngredientReferenced =
      await this.isIngredientReferencedInRecipes(id);
    if (isIngredientReferenced) {
      throw new ConflictException(
        'Ingredient is referenced in at least one recipe',
      );
    }

    const deleteResult = await this.recipeRepository.delete(id);

    if (deleteResult.affected > 0) {
      return { deletedRecipe: 1 };
    } else {
      return { deletedRecipe: 0 };
    }
  }

  private async isIngredientReferencedInRecipes(id: string): Promise<boolean> {
    const ingredientsUsedInRecipes = await this.recipeRepository
      .createQueryBuilder('recipe')
      .select('recipe.ingredients', 'ingredients')
      .getRawMany();

    return ingredientsUsedInRecipes.some((recipe) =>
      recipe.ingredients.includes(id),
    );
  }
}
