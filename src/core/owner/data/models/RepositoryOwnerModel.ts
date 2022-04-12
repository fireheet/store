import { RepositoryProps } from '@core/shared/data/models/repository/RepositoryProps';
import { OwnerModel } from './OwnerModel';

export class RepositoryOwnerModel
  extends OwnerModel
  implements RepositoryProps
{
  constructor(props: Partial<RepositoryOwnerModel>) {
    super(props);
  }

  created_at!: Date;

  updated_at!: Date | null;

  deleted_at!: Date | null;
}
