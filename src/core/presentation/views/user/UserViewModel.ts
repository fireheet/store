import { UserModel } from '@data/models/user';

type FieldsToRemove = 'password' | 'role' | 'birthdate';

type ViewModel = { birthdate: string } & Omit<UserModel, FieldsToRemove>;

export class UserViewModel implements ViewModel {
  name!: string;

  sex!: string;

  email!: string;

  documentNumber!: string;

  documentType!: string;

  birthdate!: string;

  static map(user: UserModel): ViewModel {
    return { ...user, birthdate: user.birthdate.toISOString() };
  }
}
