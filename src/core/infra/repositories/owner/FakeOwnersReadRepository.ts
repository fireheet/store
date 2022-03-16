/* eslint-disable @typescript-eslint/require-await */
import { OwnersReadRepository } from '@data/contracts/repositories';
import { DocumentModel, RepositoryOwnerModel } from '@data/models';
import { OwnerModelMockFactory } from '@data/sources/data';

export class FakeOwnersReadRepository implements OwnersReadRepository {
  owners: RepositoryOwnerModel[] = [];

  async create(owner: RepositoryOwnerModel): Promise<boolean> {
    const newOwner = OwnerModelMockFactory.makeRepositoryOwnerModel(owner);

    this.owners.push(newOwner);

    return true;
  }

  async update(owner: RepositoryOwnerModel): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    this.owners[existingOwnerIndex] =
      OwnerModelMockFactory.makeRepositoryOwnerModel(owner);

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
