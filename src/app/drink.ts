import { Ingredient } from './ingredient';

export class Drink {
    id: number;
    name: string;
    description: string;
    ingredients: Ingredient[];
}

export class DrinkQueue{
    id: number;
    drinkId: number;
}

