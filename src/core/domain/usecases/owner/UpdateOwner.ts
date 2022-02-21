import { Owner } from '@domain/entities';

export interface UpdateOwner {
  update: () => Promise<Owner>;
}
