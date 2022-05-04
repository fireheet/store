import { Recommendation } from '@core/store/domain/entities';

export interface CreateRecommendation {
  create: () => Promise<Recommendation>;
}
