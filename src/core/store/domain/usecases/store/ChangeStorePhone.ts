import { Phone } from '@core/shared/domain/value_objects';

export interface ChangeStorePhone {
  change: () => Promise<Phone>;
}
