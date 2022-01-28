import { Address } from '@domain/entities';

export interface ListAddress {
  list: () => Promise<Address>;
}
