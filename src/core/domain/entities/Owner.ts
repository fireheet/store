import { Store } from './Store';

export type Owner = {
  name: string;
  documentNumber: string;
  documentType: string;
  ownedStore: Store;
};
