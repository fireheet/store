/* eslint-disable @typescript-eslint/require-await */
import {
  DisableOwnerDTO,
  EnableOwnerDTO,
  OwnerMockFactory,
  RepositoryOwnerDTO
} from '@core/owner/data';
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

  async enable(enableOwner: EnableOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(enableOwner.id);

    if (existingOwnerIndex < 0) {
      return false;
    }

    this.owners[existingOwnerIndex].isEnabled = true;
    this.owners[existingOwnerIndex].enabled_at = new Date();
    this.owners[existingOwnerIndex].disabled_at = null;

    return true;
  }

  async disable(disableOwner: DisableOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(disableOwner.id);

    if (existingOwnerIndex < 0) {
      return false;
    }

    this.owners[existingOwnerIndex].isEnabled = false;
    this.owners[existingOwnerIndex].disabled_at = new Date();

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
