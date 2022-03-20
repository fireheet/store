import { Store } from '@core/store/domain';
import { RepositoryFields, RepositoryStatusFields } from '@core/shared';

export class RepositoryStoreModel
  extends Store
  implements RepositoryFields, RepositoryStatusFields
{
  id!: string;

  created_at!: Date;

  updated_at!: Date | null;

  deleted_at!: Date | null;

  enabled_at!: Date;

  disabled_at!: Date | null;
}
