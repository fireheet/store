import { Address } from '@domain/entities';

export interface ShowAddress {
  show: () => Promise<Address>;
}
