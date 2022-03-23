export interface DisableOwner {
  disable(disableOwnerDTO: unknown): Promise<boolean>;
}
