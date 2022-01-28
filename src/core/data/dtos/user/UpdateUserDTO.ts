import { UserModel } from '@data/models/user';

type FieldsToRemove =
  | 'password'
  | 'role'
  | 'addresses'
  | 'phone'
  | 'birthdate'
  | 'documentNumber'
  | 'documentType';

export type UpdateUserDTO = Omit<UserModel, FieldsToRemove>;
