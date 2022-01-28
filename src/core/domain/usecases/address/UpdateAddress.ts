import { Address } from '@domain/entities';

export interface UpdateAddress {
  update: () => Promise<Address>;
}
