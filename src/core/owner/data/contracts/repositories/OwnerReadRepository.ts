import { DisableOwnerDTO, EnableOwnerDTO } from '@core/owner/data/dtos';
import { DocumentModel } from '@core/shared/data';
import { OwnerModel } from '../../models/OwnerModel';
import { RepositoryOwnerModel } from '../../models/RepositoryOwnerModel';

export interface OwnerReadRepository {
  create(owner: OwnerModel): Promise<boolean>;
  replace(owner: RepositoryOwnerModel): Promise<boolean>;
  enable(enableOwner: EnableOwnerDTO): Promise<boolean>;
  disable(disableOwner: DisableOwnerDTO): Promise<boolean>;
  findByID(id: string): Promise<RepositoryOwnerModel>;
  findByDocument(document: DocumentModel): Promise<RepositoryOwnerModel>;
}
