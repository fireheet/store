import { Owner } from '@core/owner/domain/entities';
import {
  RepositoryFields,
  RepositoryStatusFields
} from '@core/shared/data/models/repository';

export class RepositoryOwnerModel
  extends Owner
  implements RepositoryFields, RepositoryStatusFields
{
  id!: string;

  created_at!: Date;

  updated_at!: Date | null;

  deleted_at!: Date | null;

  enabled_at!: Date;

  disabled_at!: Date | null;

  constructor(data: Partial<RepositoryOwnerModel>) {
    super(data);
  }
}
