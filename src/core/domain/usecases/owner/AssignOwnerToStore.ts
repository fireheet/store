import { Owner, Store } from '@domain/entities';

export interface AssignOwnerToStore {
  assign(owner: Owner, store: Store): Promise<boolean>;
}
