import { RandomInRange } from '@data/sources/utils/MockDataFunctions';
import { CreateUserDTO } from '@data/dtos/user';

interface Options {
  id?: string;
  role?: string;
  email?: string;
  password?: string;
  birthdate?: string;
  documentNumber?: string;
}

export const makeCreateUserDTOMock = (options?: Options): CreateUserDTO => {
  return {
    name: `Jonh${RandomInRange(10000000000, 99999999999)}`,
    email: options?.email || `email${RandomInRange(10000000000, 99999999999)}`,
    password: options?.password || '*T!.7_QqJw{HJvNMRGQe',
    birthdate: options?.birthdate || '01/01/2000',
    documentNumber:
      options?.documentNumber || `${RandomInRange(10000000000, 99999999999)}`,
    documentType: 'CPF',
  };
};
