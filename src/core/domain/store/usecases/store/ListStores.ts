import { Store } from '@domain/store/entities';

export interface ListStores {
  list: () => Promise<Store[]>;
}
