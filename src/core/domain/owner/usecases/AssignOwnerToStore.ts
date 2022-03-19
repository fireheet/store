import { Owner } from '@domain/owner/entities';
import { Store } from '@domain/store/entities';

export interface AssignOwnerToStore {
  assign(owner: Owner, store: Store): Promise<boolean>;
}
