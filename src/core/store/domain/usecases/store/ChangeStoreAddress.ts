import { Address } from '@core/shared/domain/value_objects';

export interface ChangeStoreAddress {
  change: () => Promise<Address>;
}
