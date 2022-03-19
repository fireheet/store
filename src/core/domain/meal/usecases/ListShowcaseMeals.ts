import { Meal } from '@domain/meal/entities';

export interface ListShowcaseMeals {
  list: () => Promise<Meal[]>;
}
