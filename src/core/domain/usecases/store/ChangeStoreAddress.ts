import { Address } from '@domain/value_objects';

export interface ChangeStoreAddress {
  change: () => Promise<Address>;
}
