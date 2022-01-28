import { User } from '@domain/entities';

export interface UpdateUser {
  update: (updateUserData: any) => Promise<User>;
}
