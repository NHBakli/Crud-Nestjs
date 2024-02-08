export class CreateRecipeDto {
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  ingredients: string[];
  instructions: string;
}
