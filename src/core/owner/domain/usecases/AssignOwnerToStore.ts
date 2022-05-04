export interface AssignOwnerToStore<T> {
  assign(inputDto: unknown): Promise<T>;
}
