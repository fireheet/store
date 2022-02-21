import { Meal } from '@domain/entities';

export interface DeleteMeal {
  delete: () => Promise<Meal>;
}
