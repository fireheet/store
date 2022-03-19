import { Store } from '@domain/store/entities';

export interface UpdateStore {
  update: () => Promise<Store>;
}
