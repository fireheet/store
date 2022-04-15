/* eslint-disable @typescript-eslint/require-await */
import { OwnerWriteRepository } from '@core/owner/data/contracts';
import { DisableOwnerDTO, EnableOwnerDTO } from '@core/owner/data/dtos';
import { OwnerModel, RepositoryOwnerModel } from '../../data/models';

export class FakeOwnerWriteRepository implements OwnerWriteRepository {
  owners: RepositoryOwnerModel[] = [];

  async create(owner: OwnerModel): Promise<RepositoryOwnerModel> {
    const persistedOwner = new RepositoryOwnerModel({ ...owner });

    this.owners.push(persistedOwner);

    return persistedOwner;
  }

  async update(owner: RepositoryOwnerModel): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    if (existingOwnerIndex < 0) {
      return false;
    }

    this.owners[existingOwnerIndex] = new RepositoryOwnerModel({ ...owner });

    return true;
  }

  async enable(enableOwner: EnableOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(enableOwner.id);

    if (existingOwnerIndex < 0) {
      return false;
    }

    this.owners[existingOwnerIndex].deleted_at = null;

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
