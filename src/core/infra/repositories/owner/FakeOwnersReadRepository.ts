import { OwnersReadRepository } from '@data/contracts/repositories';
import { DocumentModel, RepositoryOwnerModel, StoreModel } from '@data/models';

export class FakeOwnersReadRepository implements OwnersReadRepository {
  findOwnerByID(_id: string): Promise<RepositoryOwnerModel> {
    throw new Error('Method not implemented.');
  }

  findOwnerByDocument(_document: DocumentModel): Promise<RepositoryOwnerModel> {
    throw new Error('Method not implemented.');
  }

  findOwnerByStore(_store: StoreModel): Promise<RepositoryOwnerModel> {
    throw new Error('Method not implemented.');
  }

  owners: RepositoryOwnerModel[] = [];
}
