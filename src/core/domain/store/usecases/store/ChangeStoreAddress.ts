import { Address } from '@domain/shared/value_objects';

export interface ChangeStoreAddress {
  change: () => Promise<Address>;
}
