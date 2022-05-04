import { Meal } from '@core/meal/domain/entities';

export interface UpdateMeal {
  update: () => Promise<Meal>;
}
