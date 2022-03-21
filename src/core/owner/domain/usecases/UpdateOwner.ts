export interface UpdateOwner {
  update(updateOwnerDTO: unknown): Promise<boolean>;
}
