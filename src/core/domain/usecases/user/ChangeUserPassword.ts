export interface ChangeUserPassword {
  change: (
    userIdentifier: any,
    oldPassword: string,
    newPassword: string,
  ) => Promise<boolean>;
}
