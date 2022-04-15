/* eslint-disable @typescript-eslint/require-await */
import { DisableOwnerDTO, EnableOwnerDTO } from '@core/owner/data/dtos';
import { OwnerReadRepository } from '@core/owner/data/contracts';
import { RepositoryOwnerModel } from '@core/owner/data/models';
import { DocumentModel } from '@core/shared/data/models';
import {
  DocumentValidatorFactory,
  DocumentProps
} from '@core/shared/domain/value_objects';

export class FakeOwnerReadRepository implements OwnerReadRepository {
  owners: RepositoryOwnerModel[] = [];

  async create(owner: RepositoryOwnerModel): Promise<boolean> {
    this.owners.push(owner);

    return true;
  }

  async replace(owner: RepositoryOwnerModel): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    this.owners[existingOwnerIndex] = owner;

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

  async findByID(id: string): Promise<RepositoryOwnerModel> {
    const existingOwnerIndex = this.findOwnerIndex(id);

    return this.owners[existingOwnerIndex];
  }

  async findByDocument(document: DocumentProps): Promise<RepositoryOwnerModel> {
    const documentCheck = new DocumentModel(
      document,
      DocumentValidatorFactory.create()
    );

    const existingOwnerIndex = this.owners.findIndex(foundOwner =>
      foundOwner.document.isEqual(documentCheck)
    );

    return this.owners[existingOwnerIndex];
  }

  private findOwnerIndex(id: string): number {
    return this.owners.findIndex(foundOwner => foundOwner.id === id);
  }
}
