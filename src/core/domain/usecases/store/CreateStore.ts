import { Store } from '../../entities';

export interface CreateStore {
  create: () => Promise<Store>;
}
