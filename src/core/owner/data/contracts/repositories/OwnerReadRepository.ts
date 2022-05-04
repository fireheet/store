import { DisableOwnerDTO, EnableOwnerDTO } from '@core/owner/data/dtos';
import { DocumentModel } from '@core/shared/data/models';
import { OwnerModel } from '@core/owner/data/models';
import { RepositoryOwner } from '@core/owner/data/entities';

export interface OwnerReadRepository {
  create(owner: OwnerModel): Promise<boolean>;
  replace(owner: RepositoryOwner): Promise<boolean>;
  enable(enableOwner: EnableOwnerDTO): Promise<boolean>;
  disable(disableOwner: DisableOwnerDTO): Promise<boolean>;
  findByID(id: string): Promise<RepositoryOwner | undefined>;
  findByDocument(document: DocumentModel): Promise<RepositoryOwner | undefined>;
}
