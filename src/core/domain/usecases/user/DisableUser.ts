export interface DisableUser {
  disable: (userIdentifier: any) => Promise<boolean>;
}
