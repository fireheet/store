import { Store } from '../../entities';

export interface ShowStore {
  show: () => Promise<Store>;
}
