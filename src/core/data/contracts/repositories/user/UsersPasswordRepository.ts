import { ChangePasswordDTO } from '@data/dtos/user';

export interface UsersPasswordRepository {
  changeUserPassword(changePasswordDTO: ChangePasswordDTO): Promise<boolean>;
  resetUserPassword(newPassword: string): Promise<boolean>;
}
