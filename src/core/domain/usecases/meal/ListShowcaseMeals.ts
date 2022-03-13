import { Meal } from '@domain/entities';

export interface ListShowcaseMeals {
  list: () => Promise<Meal[]>;
}
