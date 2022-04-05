/* eslint-disable @typescript-eslint/require-await */
import { OwnerMockFactory, RepositoryOwnerDTO } from '@core/owner/data';
import { OwnerReadRepository } from '@core/owner/data/contracts';
import { DocumentModel } from '@core/shared/data/models/value_objects';

const repositoryOwnerDtoFactory = OwnerMockFactory.makeRepositoryOwnerDTO;

export class FakeOwnerReadRepository implements OwnerReadRepository {
  owners: RepositoryOwnerDTO[] = [];

  async create(owner: RepositoryOwnerDTO): Promise<boolean> {
    const newOwner = repositoryOwnerDtoFactory(owner);

    this.owners.push(newOwner);

    return true;
  }

  async replace(owner: RepositoryOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    this.owners[existingOwnerIndex] = owner;

    return true;
  }

  async findByID(id: string): Promise<RepositoryOwnerDTO> {
    const existingOwnerIndex = this.findOwnerIndex(id);

    return this.owners[existingOwnerIndex];
  }

  async findByDocument(document: DocumentModel): Promise<RepositoryOwnerDTO> {
    const existingOwnerIndex = this.owners.findIndex(foundOwner =>
      foundOwner.document.isEqual(document)
    );

    return this.owners[existingOwnerIndex];
  }

  private findOwnerIndex(id: string): number {
    return this.owners.findIndex(foundOwner => foundOwner.id === id);
  }
}
