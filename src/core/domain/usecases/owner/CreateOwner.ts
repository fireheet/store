import { Owner } from '@domain/entities';

export interface CreateOwner {
  create: () => Promise<Owner>;
}
