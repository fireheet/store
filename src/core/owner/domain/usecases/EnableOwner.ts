export interface EnableOwner {
  enable: (enableOwnerDTO: unknown) => Promise<boolean>;
}
