import { Recommendation } from '../../entities';

export interface ListRecommendation {
  list: () => Promise<Recommendation>;
}
