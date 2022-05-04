import { Meal } from '@core/meal/domain/entities';

export interface ListShowcaseMeals {
  list: () => Promise<Meal[]>;
}
