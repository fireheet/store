import { Availability } from '@domain/entities';

export interface ShowAvailability {
  show: () => Promise<Availability>;
}
