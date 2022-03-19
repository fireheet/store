import { Phone } from '@domain/shared/value_objects';

export interface ChangeStorePhone {
  change: () => Promise<Phone>;
}
