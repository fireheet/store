import { Availability } from '@domain/store/value_objects';

export interface ChangeStoreAvailability {
  change: () => Promise<Availability>;
}
