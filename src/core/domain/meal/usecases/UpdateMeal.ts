import { Meal } from '@domain/meal/entities';

export interface UpdateMeal {
  update: () => Promise<Meal>;
}
