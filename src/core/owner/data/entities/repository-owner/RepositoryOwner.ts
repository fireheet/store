import { RepositoryProps } from '@core/shared/data/models';
import { OwnerValidatorFactory } from '@core/owner/domain/factories';
import { OwnerModel } from '@core/owner/data/models';

export class RepositoryOwner extends OwnerModel implements RepositoryProps {
  constructor(props: Partial<RepositoryOwner>) {
    super({ ...props }, OwnerValidatorFactory.create());

    Object.assign(this, props);
  }

  created_at!: Date;

  updated_at!: Date | undefined;

  deleted_at!: Date | undefined;
}
