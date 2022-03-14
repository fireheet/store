import { Owner } from '@domain/entities';

export interface CreateOwner {
  create(ownerDto: Partial<Owner>): Promise<Owner>;
}
