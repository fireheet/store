import { RepositoryOwnerModel, StoreModel, DocumentModel } from '@data/models';

export interface OwnersReadRepository {
  findOwnerByID(id: string): Promise<RepositoryOwnerModel>;
  findOwnerByDocument(document: DocumentModel): Promise<RepositoryOwnerModel>;
  findOwnerByStore(store: StoreModel): Promise<RepositoryOwnerModel>;
}
