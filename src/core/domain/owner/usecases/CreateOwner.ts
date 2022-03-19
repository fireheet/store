import { Owner } from '@domain/owner/entities';

export interface CreateOwner {
  create(createOwnerDTO: unknown): Promise<Owner>;
}
