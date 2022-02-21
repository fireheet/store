import { Phone } from '@domain/entities';

export interface ShowPhone {
  show: () => Promise<Phone>;
}
