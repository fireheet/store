import { Availability } from '@domain/entities';

export interface UpdateAvailability {
  update: () => Promise<Availability>;
}
