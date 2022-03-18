/* eslint-disable @typescript-eslint/require-await */
import { OwnersWriteRepository } from '@data/contracts/repositories';
import { OwnerModel, RepositoryOwnerModel } from '@data/models';
import {
  EnableRepositoryOwnerDTO,
  DisableRepositoryOwnerDTO
} from '@data/dtos';
import { OwnerMockFactory } from '@data/sources/data';

const repositoryOwnerModelFactory = OwnerMockFactory.makeRepositoryOwnerModel;

export class FakeOwnersWriteRepository implements OwnersWriteRepository {
  owners: RepositoryOwnerModel[] = [];

  async create(owner: OwnerModel): Promise<RepositoryOwnerModel> {
    const newOwner = repositoryOwnerModelFactory(owner);

    this.owners.push(newOwner);

    return newOwner;
  }

  async update(owner: RepositoryOwnerModel): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    if (!existingOwnerIndex) {
      return false;
    }

    this.owners[existingOwnerIndex] = repositoryOwnerModelFactory(owner);

    return true;
  }

  async enable(enableOwner: EnableRepositoryOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(enableOwner.id);

    if (!existingOwnerIndex) {
      return false;
    }

    this.owners[existingOwnerIndex].isEnabled = true;
    this.owners[existingOwnerIndex].enabled_at = new Date();
    this.owners[existingOwnerIndex].disabled_at = null;

    return true;
  }

  async disable(disableOwner: DisableRepositoryOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(disableOwner.id);

    if (!existingOwnerIndex) {
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
