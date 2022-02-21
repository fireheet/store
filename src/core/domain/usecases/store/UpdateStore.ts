import { Store } from '../../entities';

export interface UpdateStore {
  update: () => Promise<Store>;
}
