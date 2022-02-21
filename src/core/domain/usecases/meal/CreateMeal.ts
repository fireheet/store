import { Meal } from '@domain/entities';

export interface CreateMeal {
  create: () => Promise<Meal>;
}
