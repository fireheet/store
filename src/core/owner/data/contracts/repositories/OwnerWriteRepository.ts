import {
  CreateRepositoryOwnerDTO,
  DisableOwnerDTO,
  EnableOwnerDTO,
  UpdateRepositoryOwnerDTO
} from '@core/owner/data/dtos';
import { RepositoryOwnerModel } from '@core/owner/data/models';

export interface OwnerWriteRepository {
  create(inputDto: CreateRepositoryOwnerDTO): Promise<RepositoryOwnerModel>;
  update(inputDto: UpdateRepositoryOwnerDTO): Promise<boolean>;
  enable(enableOwner: EnableOwnerDTO): Promise<boolean>;
  disable(disableOwner: DisableOwnerDTO): Promise<boolean>;
}
