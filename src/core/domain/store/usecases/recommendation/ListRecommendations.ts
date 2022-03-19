import { Recommendation } from '@domain/store/entities';

export interface ListRecommendation {
  list: () => Promise<Recommendation[]>;
}
