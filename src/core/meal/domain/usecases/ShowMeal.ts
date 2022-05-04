import { Meal } from '@core/meal/domain/entities';

export interface ShowMeal {
  show: () => Promise<Meal>;
}
