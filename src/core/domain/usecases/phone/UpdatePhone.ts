import { Phone } from '@domain/entities';

export interface UpdatePhone {
  update: () => Promise<Phone>;
}
