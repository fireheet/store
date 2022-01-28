import { RepositoryUserDTO } from '@data/dtos/user';
import { RandomInRange } from '@data/sources/utils/MockDataFunctions';

interface Options {
  id?: string;
  role?: string;
  email?: string;
  password?: string;
  birthdate?: Date;
  documentNumber?: string;
}

export const makeRepositoryUserDTOMock = (
  options?: Options,
): RepositoryUserDTO => {
  return {
    id: options?.id || `${RandomInRange(10000000000, 99999999999)}`,
    role: { name: options?.role || 'CUSTOMER' },
    name: `Jonh${RandomInRange(10000000000, 99999999999)}`,
    email: options?.email || `email${RandomInRange(10000000000, 99999999999)}`,
    password: options?.password || '*T!.7_QqJw{HJvNMRGQe',
    birthdate: options?.birthdate || new Date(),
    documentNumber:
      options?.documentNumber || `${RandomInRange(10000000000, 99999999999)}`,
    documentType: 'CPF',
    created_at: new Date(),
    updated_at: null,
    disabled_at: null,
    enable_at: null,
  };
};
