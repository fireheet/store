import { Store } from '../../entities';

export interface CloseStore {
  close: () => Promise<Store>;
}
