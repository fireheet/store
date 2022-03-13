import { Store } from '../../entities';

export interface ListStores {
  list: () => Promise<Store[]>;
}
