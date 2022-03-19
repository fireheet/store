import { Meal } from '@domain/meal/entities';

export interface ShowMeal {
  show: () => Promise<Meal>;
}
