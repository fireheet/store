import {
  CreateRepositoryOwnerDTO,
  DisableOwnerDTO,
  EnableOwnerDTO,
  RepositoryOwnerDTO,
  UpdateRepositoryOwnerDTO
} from '@core/owner/data/dtos';

export interface OwnerWriteRepository {
  create(inputDto: CreateRepositoryOwnerDTO): Promise<RepositoryOwnerDTO>;
  update(inputDto: UpdateRepositoryOwnerDTO): Promise<boolean>;
  enable(enableOwner: EnableOwnerDTO): Promise<boolean>;
  disable(disableOwner: DisableOwnerDTO): Promise<boolean>;
}
