import { User } from '@domain/entities';

export interface ListUser {
  list: (userIdentifier: any) => Promise<User>;
}
