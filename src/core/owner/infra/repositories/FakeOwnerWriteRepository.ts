/* eslint-disable @typescript-eslint/require-await */
import { OwnerWriteRepository } from '@core/owner/data/contracts';
import { OwnerModel, RepositoryOwnerModel } from '@core/owner/data/models';
import {
  EnableRepositoryOwnerDTO,
  DisableRepositoryOwnerDTO,
  OwnerMockFactory
} from '@core/owner/data';

const repositoryOwnerModelFactory = OwnerMockFactory.makeRepositoryOwnerModel;

export class FakeOwnerWriteRepository implements OwnerWriteRepository {
  owners: RepositoryOwnerModel[] = [];

  async create(owner: OwnerModel): Promise<RepositoryOwnerModel> {
    const newOwner = repositoryOwnerModelFactory(owner);

    this.owners.push(newOwner);

    return newOwner;
  }

  async update(owner: RepositoryOwnerModel): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    if (existingOwnerIndex < 0) {
      return false;
    }

    this.owners[existingOwnerIndex] = repositoryOwnerModelFactory(owner);

    return true;
  }

  async enable(enableOwner: EnableRepositoryOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(enableOwner.id);

    if (existingOwnerIndex < 0) {
      return false;
    }

    this.owners[existingOwnerIndex].isEnabled = true;
    this.owners[existingOwnerIndex].enabled_at = new Date();
    this.owners[existingOwnerIndex].disabled_at = null;

    return true;
  }

  async disable(disableOwner: DisableRepositoryOwnerDTO): Promise<boolean> {
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
