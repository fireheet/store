import { Phone } from '@domain/entities';

export interface ListPhone {
  list: () => Promise<Phone>;
}
