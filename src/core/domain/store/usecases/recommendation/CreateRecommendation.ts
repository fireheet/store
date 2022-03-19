import { Recommendation } from '@domain/store/entities';

export interface CreateRecommendation {
  create: () => Promise<Recommendation>;
}
