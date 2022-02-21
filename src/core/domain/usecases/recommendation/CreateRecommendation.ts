import { Recommendation } from '../../entities';

export interface CreateRecommendation {
  create: () => Promise<Recommendation>;
}
