/* eslint-disable @typescript-eslint/require-await */
import { OwnersWriteRepository } from '@data/contracts/repositories';
import { RepositoryOwnerModel } from '@data/models';
import {
  CreateRepositoryOwnerDTO,
  UpdateRepositoryOwnerDTO,
  EnableRepositoryOwnerDTO,
  DisableRepositoryOwnerDTO
} from '@data/dtos';
import { OwnerModelMockFactory } from '@data/sources/data';

export class FakeOwnersWriteRepository implements OwnersWriteRepository {
  owners: RepositoryOwnerModel[] = [];

  async create(owner: CreateRepositoryOwnerDTO): Promise<RepositoryOwnerModel> {
    const newOwner = OwnerModelMockFactory.makeRepositoryOwnerModel(owner);

    this.owners.push(newOwner);

    return newOwner;
  }

  async update(owner: UpdateRepositoryOwnerDTO): Promise<RepositoryOwnerModel> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    this.owners[existingOwnerIndex] =
      OwnerModelMockFactory.makeRepositoryOwnerModel(owner);

    return this.owners[existingOwnerIndex];
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
