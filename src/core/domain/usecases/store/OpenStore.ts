import { Store } from '../../entities';

export interface OpenStore {
  open: () => Promise<Store>;
}
