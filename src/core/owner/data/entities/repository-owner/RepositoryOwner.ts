import { RepositoryProps } from '@core/shared/data/models';
import { OwnerValidatorFactory } from '@core/owner/domain/factories';
import { OwnerModel } from '@core/owner/data/models';

export class RepositoryOwner extends OwnerModel implements RepositoryProps {
  constructor(props: Partial<RepositoryOwner>) {
    super(props, OwnerValidatorFactory.create());
  }

  created_at!: Date;

  updated_at!: Date | null;

  deleted_at!: Date | null;
}
