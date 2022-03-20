import { Owner } from '@core/owner/domain/entities';

export interface UpdateOwner {
  update: () => Promise<Owner>;
}
