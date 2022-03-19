import { Owner } from '@domain/owner/entities';

export interface UpdateOwner {
  update: () => Promise<Owner>;
}
