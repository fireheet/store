import { RepositoryOwnerModel } from '@core/owner/data/models';
import { DocumentModel } from '@core/shared/data/models/value_objects';

export interface OwnerReadRepository {
  create(owner: RepositoryOwnerModel): Promise<boolean>;
  replace(owner: RepositoryOwnerModel): Promise<boolean>;
  findByID(id: string): Promise<RepositoryOwnerModel>;
  findByDocument(document: DocumentModel): Promise<RepositoryOwnerModel>;
}
