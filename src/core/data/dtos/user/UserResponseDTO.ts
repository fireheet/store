import { UserModel } from '@data/models/user';

type FieldsToRemove = 'password' | 'role';

export type UserResponseDTO = Omit<UserModel, FieldsToRemove>;
