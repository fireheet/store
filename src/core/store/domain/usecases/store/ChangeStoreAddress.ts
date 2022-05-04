import { Address } from '@core/shared/domain/value-objects';

export interface ChangeStoreAddress {
  change: () => Promise<Address>;
}
