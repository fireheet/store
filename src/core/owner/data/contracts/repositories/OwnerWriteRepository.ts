import {
  CreateRepositoryOwnerDTO,
  DisableOwnerDTO,
  EnableOwnerDTO,
  UpdateRepositoryOwnerDTO
} from '@core/owner/data/dtos';
import { RepositoryOwner } from '@core/owner/data/entities';

export interface OwnerWriteRepository {
  create(inputDto: CreateRepositoryOwnerDTO): Promise<RepositoryOwner>;
  update(inputDto: UpdateRepositoryOwnerDTO): Promise<boolean>;
  enable(enableOwner: EnableOwnerDTO): Promise<boolean>;
  disable(disableOwner: DisableOwnerDTO): Promise<boolean>;
}
