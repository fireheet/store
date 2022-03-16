import { OwnerModel, RepositoryOwnerModel } from '@data/models';
import {
  DisableRepositoryOwnerDTO,
  EnableRepositoryOwnerDTO
} from '@data/dtos';

export interface OwnersWriteRepository {
  create(owner: OwnerModel): Promise<RepositoryOwnerModel>;
  update(owner: RepositoryOwnerModel): Promise<boolean>;
  enable(enableOwner: EnableRepositoryOwnerDTO): Promise<boolean>;
  disable(disableOwner: DisableRepositoryOwnerDTO): Promise<boolean>;
}
