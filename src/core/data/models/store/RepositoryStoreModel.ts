import { Store } from '@domain/entities';
import { RepositoryFields, StatusRepositoryFields } from '../repository';

export class RepositoryStoreModel
  extends Store
  implements RepositoryFields, StatusRepositoryFields
{
  id!: string;

  created_at!: Date;

  updated_at!: Date | null;

  deleted_at!: Date | null;

  enabled_at!: Date;

  disabled_at!: Date | null;
}
