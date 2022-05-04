import { Phone } from '@core/shared/domain/value-objects';

export interface ChangeStorePhone {
  change: () => Promise<Phone>;
}
