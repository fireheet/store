import { Availability } from '@domain/value_objects';

export interface ChangeStoreAvailability {
  change: () => Promise<Availability>;
}
