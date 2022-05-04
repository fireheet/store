import { Meal } from '@core/meal/domain/entities';

export interface AddMealToShowcase {
  add: () => Promise<Meal>;
}
