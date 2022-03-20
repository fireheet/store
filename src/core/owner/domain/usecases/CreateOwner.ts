import { Owner } from '@core/owner/domain/entities';

export interface CreateOwner {
  create(createOwnerDTO: unknown): Promise<Owner>;
}
