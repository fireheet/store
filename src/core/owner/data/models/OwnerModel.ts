import { Owner } from '@core/owner/domain/entities/Owner';

export class OwnerModel extends Owner {
  constructor(data: Partial<OwnerModel>) {
    super(data);
  }
}
