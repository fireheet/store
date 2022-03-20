/* eslint-disable @typescript-eslint/require-await */
import { RepositoryOwnerModel } from '@core/owner/data/models';
import { OwnerMockFactory } from '@core/owner/data';
import { OwnersReadRepository } from '@core/owner/data/contracts';
import { DocumentModel } from '@core/shared/data/models/value_objects';

const repositoryOwnerModelFactory = OwnerMockFactory.makeRepositoryOwnerModel;

export class FakeOwnersReadRepository implements OwnersReadRepository {
  owners: RepositoryOwnerModel[] = [];

  async create(owner: RepositoryOwnerModel): Promise<boolean> {
    const newOwner = repositoryOwnerModelFactory(owner);

    this.owners.push(newOwner);

    return true;
  }

  async update(owner: RepositoryOwnerModel): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    this.owners[existingOwnerIndex] = repositoryOwnerModelFactory(owner);

    return true;
  }

  async findOwnerByID(id: string): Promise<RepositoryOwnerModel> {
    const existingOwnerIndex = this.findOwnerIndex(id);

    return this.owners[existingOwnerIndex];
  }

  async findOwnerByDocument(
    document: DocumentModel
  ): Promise<RepositoryOwnerModel> {
    const existingOwnerIndex = this.owners.findIndex(foundOwner =>
      foundOwner.document.isEqual(document)
    );

    return this.owners[existingOwnerIndex];
  }

  private findOwnerIndex(id: string): number {
    return this.owners.findIndex(foundOwner => foundOwner.id === id);
  }
}
