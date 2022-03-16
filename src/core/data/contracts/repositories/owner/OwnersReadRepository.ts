import { RepositoryOwnerModel, DocumentModel } from '@data/models';

export interface OwnersReadRepository {
  create(owner: RepositoryOwnerModel): Promise<boolean>;
  update(owner: RepositoryOwnerModel): Promise<boolean>;
  findOwnerByID(id: string): Promise<RepositoryOwnerModel>;
  findOwnerByDocument(document: DocumentModel): Promise<RepositoryOwnerModel>;
}
