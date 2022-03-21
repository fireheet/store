import { OwnerModel, RepositoryOwnerModel } from '@core/owner/data/models';
import {
  DisableRepositoryOwnerDTO,
  EnableRepositoryOwnerDTO
} from '@core/owner/data/dtos';

export interface OwnerWriteRepository {
  create(owner: OwnerModel): Promise<RepositoryOwnerModel>;
  update(owner: RepositoryOwnerModel): Promise<boolean>;
  enable(enableOwner: EnableRepositoryOwnerDTO): Promise<boolean>;
  disable(disableOwner: DisableRepositoryOwnerDTO): Promise<boolean>;
}
