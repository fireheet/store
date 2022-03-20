import { Meal } from '@core/meal/domain/entities';
import { RepositoryFields } from '@core/shared/data/models/repository';

export class RepositoryMealModel extends Meal implements RepositoryFields {
  id!: string;

  created_at!: Date;

  updated_at!: Date | null;

  deleted_at!: Date | null;
}
