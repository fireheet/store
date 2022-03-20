import { Phone } from '@core/shared/domain';

export interface ChangeStorePhone {
  change: () => Promise<Phone>;
}
