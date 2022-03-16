import { RepositoryOwnerModel } from '@data/models';
import {
  CreateRepositoryOwnerDTO,
  DisableRepositoryOwnerDTO,
  EnableRepositoryOwnerDTO,
  UpdateRepositoryOwnerDTO
} from '@data/dtos';

export interface OwnersWriteRepository {
  create(owner: CreateRepositoryOwnerDTO): Promise<RepositoryOwnerModel>;
  update(owner: UpdateRepositoryOwnerDTO): Promise<RepositoryOwnerModel>;
  enable(enableOwner: EnableRepositoryOwnerDTO): Promise<boolean>;
  disable(disableOwner: DisableRepositoryOwnerDTO): Promise<boolean>;
}
