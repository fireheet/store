import { Store } from '@core/store/domain/entities';

export interface CreateStore {
  create: () => Promise<Store>;
}
