import { Owner } from '@domain/entities';

export interface ShowOwner {
  show: () => Promise<Owner>;
}
