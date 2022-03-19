import { Meal } from '@domain/meal/entities';

export interface AddMealToShowcase {
  add: () => Promise<Meal>;
}
