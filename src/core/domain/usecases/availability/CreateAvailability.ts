import { Availability } from '@domain/entities';

export interface CreateAvailability {
  create: () => Promise<Availability>;
}
