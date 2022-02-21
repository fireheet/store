import { Recommendation } from '../../entities';

export interface DeleteRecommendation {
  delete: () => Promise<Recommendation>;
}
