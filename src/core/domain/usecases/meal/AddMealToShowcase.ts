import { Meal } from '@domain/entities';

export interface AddMealToShowcase {
  add: () => Promise<Meal>;
}
