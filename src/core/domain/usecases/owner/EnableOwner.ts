import { Owner } from '@domain/entities';

export interface EnableOwner {
  enable: () => Promise<Owner>;
}
