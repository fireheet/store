import { RepositoryOwnerModel } from '@core/owner/data/models';
import { DocumentModel } from '@core/shared/data/models/value_objects';

export interface OwnersReadRepository {
  create(owner: RepositoryOwnerModel): Promise<boolean>;
  update(owner: RepositoryOwnerModel): Promise<boolean>;
  findOwnerByID(id: string): Promise<RepositoryOwnerModel>;
  findOwnerByDocument(document: DocumentModel): Promise<RepositoryOwnerModel>;
}
