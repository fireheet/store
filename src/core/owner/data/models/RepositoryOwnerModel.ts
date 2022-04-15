import { RepositoryProps } from '@core/shared/data/models';
import { OwnerValidatorFactory } from '@core/owner/domain/factories';
import { OwnerModel } from './OwnerModel';

export class RepositoryOwnerModel
  extends OwnerModel
  implements RepositoryProps
{
  constructor(props: Partial<RepositoryOwnerModel>) {
    super(props, OwnerValidatorFactory.create());
  }

  created_at!: Date;

  updated_at!: Date | null;

  deleted_at!: Date | null;
}
