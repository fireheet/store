import { Address } from './Address';
import { Availability } from './Availability';
import { Phone } from './Phone';

export type Store = {
  name: string;
  logo: string;
  address: Address;
  phone: Phone;
  Availability: Availability;
  starRating: number;
  slogan: string;
  documentNumber: string;
  documentType: string;
};
