import { Address } from '@core/shared/domain';

export interface ChangeStoreAddress {
  change: () => Promise<Address>;
}
