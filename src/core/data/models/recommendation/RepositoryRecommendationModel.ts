import { Recommendation } from '@domain/entities';
import { RepositoryFields } from '../repository';

export class RepositoryRecommendationModel
  extends Recommendation
  implements RepositoryFields
{
  id!: string;

  created_at!: Date;

  updated_at!: Date | null;

  deleted_at!: Date | null;
}
