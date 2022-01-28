import { Address } from './Address';
import { Phone } from './Phone';
import { Role } from './Role';

export type User = {
  role: Role;
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  documentNumber: string;
  documentType: string;
  addresses?: Address[];
  phone?: Phone;
};
