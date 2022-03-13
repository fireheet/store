import { Phone } from '@domain/value_objects';

export interface ChangeStorePhone {
  change: () => Promise<Phone>;
}
