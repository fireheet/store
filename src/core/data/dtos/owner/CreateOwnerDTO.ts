import { DocumentModel, StoreModel } from '@data/models';

export type CreateOwnerDTO = {
  name: string;
  document: DocumentModel;
  ownedStore: StoreModel;
};
