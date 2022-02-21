import { Meal } from '@domain/entities';

export interface UpdateMeal {
  update: () => Promise<Meal>;
}
