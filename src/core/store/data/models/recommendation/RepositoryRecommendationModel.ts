import { Recommendation } from '@core/store/domain';
import { RepositoryFields } from '@core/shared';

export class RepositoryRecommendationModel
  extends Recommendation
  implements RepositoryFields
{
  id!: string;

  created_at!: Date;

  updated_at!: Date | null;

  deleted_at!: Date | null;
}
