import { RepositoryOwnerModel } from '@data/models';
import { CreateOwnerDTO, UpdateOwnerDTO } from '@data/dtos';

export interface OwnersWriteRepository {
  save(createOwner: CreateOwnerDTO): Promise<RepositoryOwnerModel>;
  update(updateOwner: UpdateOwnerDTO): Promise<RepositoryOwnerModel>;
  enable(id: string): Promise<RepositoryOwnerModel>;
  disable(id: string): Promise<RepositoryOwnerModel>;
}
