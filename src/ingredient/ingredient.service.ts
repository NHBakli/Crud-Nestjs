import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entity/ingredient.entity';
import { CreateIngredientDto } from './dto/CreateIngredientDto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository,
  ) {}

  findOne(id: string) {
    try {
      return this.ingredientRepository.find({ where: { id: +id } });
    } catch {
      ('Ingredient not found');
    }
  }

  findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  create(createIngredientDto: CreateIngredientDto) {
    const newIngredient = this.ingredientRepository.create(createIngredientDto);
    return this.ingredientRepository.save(newIngredient);
  }

  async update(
    id: string,
    updatedIngredient: Partial<Ingredient>,
  ): Promise<Ingredient> {
    const ingredientToUpdate = await this.ingredientRepository.findOne({
      where: { id: +id },
    });
    if (!ingredientToUpdate) {
      throw new NotFoundException('Ingredient not found');
    }

    const oldName = ingredientToUpdate.name;

    if (updatedIngredient.name !== oldName) {
      console.log('BAZINGA');
    }

    Object.assign(ingredientToUpdate, updatedIngredient);

    return await this.ingredientRepository.save(ingredientToUpdate);
  }

  async delete(id: string): Promise<{ deletedIngredients: number }> {
    const ingredientToDelete = await this.ingredientRepository.findOne({
      where: { id: +id },
    });
    if (!ingredientToDelete) {
      throw new NotFoundException('Ingredient not found');
    }

    const deleteResult = await this.ingredientRepository.delete(id);

    if (deleteResult.affected > 0) {
      return { deletedIngredients: 1 };
    } else {
      return { deletedIngredients: 0 };
    }
  }
}
