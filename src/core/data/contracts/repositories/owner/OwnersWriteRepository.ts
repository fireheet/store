import { OwnerModel, RepositoryOwnerModel } from '@data/models';

export interface OwnersWriteRepository {
  save(owner: OwnerModel): Promise<RepositoryOwnerModel>;
  update(owner: OwnerModel): Promise<RepositoryOwnerModel>;
  enable(id: string): Promise<boolean>;
  disable(id: string): Promise<boolean>;
}
