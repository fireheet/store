import { Meal } from '@domain/meal/entities';

export interface DeleteMeal {
  delete: () => Promise<Meal>;
}
