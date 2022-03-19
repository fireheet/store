import { Owner } from '@domain/owner';
import { RepositoryFields, RepositoryStatusFields } from '../repository';

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
}
