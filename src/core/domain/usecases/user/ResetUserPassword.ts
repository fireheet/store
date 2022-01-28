export interface ResetUserPassword {
  reset: (userIdentifier: any, newPassword: string) => Promise<boolean>;
}
