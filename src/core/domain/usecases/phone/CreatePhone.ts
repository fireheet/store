import { Phone } from '@domain/entities';

export interface CreatePhone {
  create: () => Promise<Phone>;
}
