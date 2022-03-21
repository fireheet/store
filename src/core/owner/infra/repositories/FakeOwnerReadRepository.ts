/* eslint-disable @typescript-eslint/require-await */
import { RepositoryOwnerModel } from '@core/owner/data/models';
import { OwnerMockFactory } from '@core/owner/data';
import { OwnerReadRepository } from '@core/owner/data/contracts';
import { DocumentModel } from '@core/shared/data/models/value_objects';

const repositoryOwnerModelFactory = OwnerMockFactory.makeRepositoryOwnerModel;

export class FakeOwnerReadRepository implements OwnerReadRepository {
  owners: RepositoryOwnerModel[] = [];

  async create(owner: RepositoryOwnerModel): Promise<boolean> {
    const newOwner = repositoryOwnerModelFactory(owner);

    this.owners.push(newOwner);

    return true;
  }

  async replace(owner: RepositoryOwnerModel): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    this.owners[existingOwnerIndex] = owner;

    return true;
  }

  async findByID(id: string): Promise<RepositoryOwnerModel> {
    const existingOwnerIndex = this.findOwnerIndex(id);

    return this.owners[existingOwnerIndex];
  }

  async findByDocument(document: DocumentModel): Promise<RepositoryOwnerModel> {
    const existingOwnerIndex = this.owners.findIndex(foundOwner =>
      foundOwner.document.isEqual(document)
    );

    return this.owners[existingOwnerIndex];
  }

  private findOwnerIndex(id: string): number {
    return this.owners.findIndex(foundOwner => foundOwner.id === id);
  }
}
