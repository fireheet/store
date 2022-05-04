import { Store } from '@core/store/domain/entities';

export interface UpdateStore {
  update: () => Promise<Store>;
}
