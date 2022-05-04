/* eslint-disable @typescript-eslint/require-await */
import { OwnerWriteRepository } from '@core/owner/data/contracts';
import {
  CreateRepositoryOwnerDTO,
  DisableOwnerDTO,
  EnableOwnerDTO,
  UpdateRepositoryOwnerDTO
} from '@core/owner/data/dtos';
import {
  RepositoryOwner,
  RepositoryOwnerFactory
} from '@core/owner/data/entities';
import { OwnerFactory } from '@core/owner/domain/factories';

export class FakeOwnerWriteRepository implements OwnerWriteRepository {
  owners: RepositoryOwner[] = [];

  create({
    name,
    document
  }: CreateRepositoryOwnerDTO): Promise<RepositoryOwner> {
    const persistedOwner = RepositoryOwnerFactory.create(
      OwnerFactory.create({
        name,
        documentNumber: document.number
      })
    );

    this.owners.push(persistedOwner);

    return Promise.resolve(persistedOwner);
  }

  update({ id, name }: UpdateRepositoryOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(id);

    if (existingOwnerIndex < 0) {
      return Promise.resolve(false);
    }

    this.owners[existingOwnerIndex].name = name;

    return Promise.resolve(true);
  }

  enable({ id }: EnableOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(id);

    if (existingOwnerIndex < 0) {
      return Promise.resolve(false);
    }

    this.owners[existingOwnerIndex].deleted_at = undefined;

    return Promise.resolve(true);
  }

  disable({ id }: DisableOwnerDTO): Promise<boolean> {
    const existingOwnerIndex = this.findOwnerIndex(id);

    if (existingOwnerIndex < 0) {
      return Promise.resolve(false);
    }

    this.owners[existingOwnerIndex].deleted_at = new Date();

    return Promise.resolve(true);
  }

  findOwnerIndex(id: string): number {
    return this.owners.findIndex(foundOwner => foundOwner.id === id);
  }
}
