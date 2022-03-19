import { Store } from '@domain/store/entities';

export interface ShowStore {
  show: () => Promise<Store>;
}
