import { Owner } from './Owner';

export type Meal = {
  name: string;
  price: number;
  image: string;
  createdBy: Owner;
  isOnShowcase: boolean;
};
