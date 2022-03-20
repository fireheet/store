import { Owner } from '@core/owner/domain/entities';
import { Store } from '@core/store/domain/entities';

export interface AssignOwnerToStore {
  assign(owner: Owner, store: Store): Promise<boolean>;
}
