import { Owner } from '@domain/owner/entities';

export interface EnableOwner {
  enable: () => Promise<Owner>;
}
