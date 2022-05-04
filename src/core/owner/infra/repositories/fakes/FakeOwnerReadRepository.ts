/* eslint-disable @typescript-eslint/require-await */
import { DisableOwnerDTO, EnableOwnerDTO } from '@core/owner/data/dtos';
import { OwnerReadRepository } from '@core/owner/data/contracts';
import { RepositoryOwner } from '@core/owner/data/entities';
import { DocumentModel } from '@core/shared/data/models';

export class FakeOwnerReadRepository implements OwnerReadRepository {
  owners: RepositoryOwner[] = [];

  create(owner: RepositoryOwner): Promise<boolean> {
    this.owners.push(owner);

    return Promise.resolve(true);
  }

  replace(owner: RepositoryOwner): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    this.owners[existingOwnerIndex] = owner;

    return Promise.resolve(true);
  }

  enable(enableOwner: EnableOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(enableOwner.id);

    if (existingOwnerIndex < 0) {
      return Promise.resolve(false);
    }

    this.owners[existingOwnerIndex].deleted_at = undefined;

    return Promise.resolve(true);
  }

  disable(disableOwner: DisableOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(disableOwner.id);

    if (existingOwnerIndex < 0) {
      return Promise.resolve(false);
    }

    this.owners[existingOwnerIndex].deleted_at = new Date();

    return Promise.resolve(true);
  }

  findByID(id: string): Promise<RepositoryOwner> {
    const existingOwnerIndex = this.findOwnerIndex(id);

    return Promise.resolve(this.owners[existingOwnerIndex]);
  }

  findByDocument(document: DocumentModel): Promise<RepositoryOwner> {
    const existingOwnerIndex = this.owners.findIndex(foundOwner =>
      foundOwner.document.isEqualCPF(document.number)
    );

    return Promise.resolve(this.owners[existingOwnerIndex]);
  }

  private findOwnerIndex(id: string): number {
    return this.owners.findIndex(foundOwner => foundOwner.id === id);
  }
}
