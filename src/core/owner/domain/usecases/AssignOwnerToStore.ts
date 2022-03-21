export interface AssignOwnerToStore {
  assign(owner: unknown, targetStore: unknown): Promise<boolean>;
}
