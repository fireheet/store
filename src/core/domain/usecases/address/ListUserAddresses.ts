import { Address } from '@domain/entities';

export interface ListUserAddresses {
  list: () => Promise<Address[]>;
}
