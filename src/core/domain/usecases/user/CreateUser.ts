import { User } from '@domain/entities';

export interface CreateUser {
  create: (userData: any) => Promise<User>;
}
