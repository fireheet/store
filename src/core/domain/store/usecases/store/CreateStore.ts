import { Store } from '@domain/store/entities';

export interface CreateStore {
  create: () => Promise<Store>;
}
