import { Store } from './Store';

export type Recommendation = {
  store: Store;
  country: string;
  isPositive: boolean;
  isNegative: boolean;
  stars: number;
};
