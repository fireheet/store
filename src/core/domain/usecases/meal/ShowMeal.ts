import { Meal } from '@domain/entities';

export interface ShowMeal {
  show: () => Promise<Meal>;
}
