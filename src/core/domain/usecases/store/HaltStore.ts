import { Store } from '../../entities';

export interface HaltStore {
  halt: () => Promise<Store>;
}
