import { Meal } from '@domain/entities';

export interface RemoveMealFromShowcase {
  remove: () => Promise<Meal>;
}
