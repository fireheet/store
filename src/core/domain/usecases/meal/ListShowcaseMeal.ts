import { Meal } from '@domain/entities';

export interface ListShowcaseMeal {
  list: () => Promise<Meal>;
}
