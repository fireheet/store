export interface EnableUser {
  enable: (userIdentifier: any) => Promise<boolean>;
}
