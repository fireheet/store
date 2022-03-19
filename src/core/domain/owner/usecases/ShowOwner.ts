import { Owner } from '@domain/owner/entities';

export interface ShowOwner {
  show: () => Promise<Owner>;
}
