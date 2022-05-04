import { Recommendation } from '@core/store/domain/entities';

export interface ListRecommendation {
  list: () => Promise<Recommendation[]>;
}
