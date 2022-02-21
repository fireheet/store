import { Owner } from '@domain/entities';

export interface DisableOwner {
  disable: () => Promise<Owner>;
}
