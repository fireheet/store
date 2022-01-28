import { User } from '@domain/entities';

type FieldsToRemove = 'addresses' | 'phone' | 'role' | 'birthdate';

export type CreateUserDTO = { birthdate: string } & Omit<User, FieldsToRemove>;
