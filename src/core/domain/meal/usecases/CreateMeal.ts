import { Meal } from '@domain/meal/entities';

export interface CreateMeal {
  create: () => Promise<Meal>;
}
