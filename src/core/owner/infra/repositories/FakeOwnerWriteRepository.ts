/* eslint-disable @typescript-eslint/require-await */
import { OwnerWriteRepository } from '@core/owner/data/contracts';
import { OwnerModel } from '@core/owner/data/models';
import {
  DisableOwnerDTO,
  EnableOwnerDTO,
  OwnerMockFactory,
  RepositoryOwnerDTO
} from '@core/owner/data';

const repositoryOwnerModelFactory = OwnerMockFactory.makeRepositoryOwnerDTO;

export class FakeOwnerWriteRepository implements OwnerWriteRepository {
  owners: RepositoryOwnerDTO[] = [];

  async create(owner: OwnerModel): Promise<RepositoryOwnerDTO> {
    const newOwner = repositoryOwnerModelFactory(owner);

    this.owners.push(newOwner);

    return newOwner;
  }

  async update(owner: RepositoryOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    if (existingOwnerIndex < 0) {
      return false;
    }

    this.owners[existingOwnerIndex] = repositoryOwnerModelFactory(owner);

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

  private findOwnerIndex(id: string): number {
    return this.owners.findIndex(foundOwner => foundOwner.id === id);
  }
}
