/* eslint-disable @typescript-eslint/require-await */
import { DisableOwnerDTO, EnableOwnerDTO } from '@core/owner/data/dtos';
import { OwnerReadRepository } from '@core/owner/data/contracts';
import { RepositoryOwner } from '@core/owner/data/entities';
import { DocumentModel } from '@core/shared/data/models';
import {
  DocumentValidatorFactory,
  DocumentProps,
  DocumentType
} from '@core/shared/domain/value_objects';

export class FakeOwnerReadRepository implements OwnerReadRepository {
  owners: RepositoryOwner[] = [];

  async create(owner: RepositoryOwner): Promise<boolean> {
    this.owners.push(owner);

    return true;
  }

  async replace(owner: RepositoryOwner): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(owner.id);

    this.owners[existingOwnerIndex] = owner;

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

  async findByID(id: string): Promise<RepositoryOwner> {
    const existingOwnerIndex = this.findOwnerIndex(id);

    return this.owners[existingOwnerIndex];
  }

  async findByDocument(document: DocumentProps): Promise<RepositoryOwner> {
    const documentCheck = new DocumentModel(
      { number: document.number, type: DocumentType.CPF },
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
