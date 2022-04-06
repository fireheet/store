import {
  DisableOwnerDTO,
  EnableOwnerDTO,
  RepositoryOwnerDTO
} from '@core/owner/data/dtos';
import { DocumentModel } from '@core/shared/data/models/value_objects';

export interface OwnerReadRepository {
  create(owner: RepositoryOwnerDTO): Promise<boolean>;
  replace(owner: RepositoryOwnerDTO): Promise<boolean>;
  enable(enableOwner: EnableOwnerDTO): Promise<boolean>;
  disable(disableOwner: DisableOwnerDTO): Promise<boolean>;
  findByID(id: string): Promise<RepositoryOwnerDTO>;
  findByDocument(document: DocumentModel): Promise<RepositoryOwnerDTO>;
}
