import { Availability } from '@core/store/domain/value_objects';

export interface ChangeStoreAvailability {
  change: () => Promise<Availability>;
}
