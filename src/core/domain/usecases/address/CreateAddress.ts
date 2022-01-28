import { Address } from '@domain/entities';

export interface CreateAddress {
  create: () => Promise<Address>;
}
