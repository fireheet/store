/* eslint-disable @typescript-eslint/require-await */
import { OwnerWriteRepository } from '@core/owner/data/contracts';
import { DisableOwnerDTO, EnableOwnerDTO } from '@core/owner/data/dtos';
import { OwnerModel } from '@core/owner/data/models';
import { RepositoryOwner } from '@core/owner/data/entities';

export class FakeOwnerWriteRepository implements OwnerWriteRepository {
  owners: RepositoryOwner[] = [];

  async create(owner: OwnerModel): Promise<RepositoryOwner> {
    const persistedOwner = new RepositoryOwner({ ...owner });

    this.owners.push(persistedOwner);

    return persistedOwner;
  }

  async update(owner: RepositoryOwner): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    if (existingOwnerIndex < 0) {
      return false;
    }

    this.owners[existingOwnerIndex] = new RepositoryOwner({ ...owner });

    return true;
  }

  async enable(enableOwner: EnableOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(enableOwner.id);

    if (existingOwnerIndex < 0) {
      return false;
    }

    this.owners[existingOwnerIndex].deleted_at = undefined;

    return true;
  }

  async disable(disableOwner: DisableOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(disableOwner.id);

    if (existingOwnerIndex < 0) {
      return false;
    }

    this.owners[existingOwnerIndex].deleted_at = new Date();

    return true;
  }

  private findOwnerIndex(id: string): number {
    return this.owners.findIndex(foundOwner => foundOwner.id === id);
  }
}
