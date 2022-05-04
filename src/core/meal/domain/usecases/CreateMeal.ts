import { Meal } from '@core/meal/domain/entities';

export interface CreateMeal {
  create: () => Promise<Meal>;
}
