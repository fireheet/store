import { Owner } from '@domain/entities';

export interface CreateOwner {
  create(createOwnerDTO: unknown): Promise<Owner>;
}
