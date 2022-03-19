import { CreateOwner } from '@domain/owner';
import { CreateOwnerDTO } from '@data/dtos';
import {
  OwnersReadRepository,
  OwnersWriteRepository
} from '@data/contracts/repositories';
import { DocumentAlreadyExistsException } from '@data/contracts/exceptions';
import { DocumentModel, OwnerModel, RepositoryOwnerModel } from '@data/models';
import { inject, injectable } from 'inversify';
import { OwnerTypes } from '@config/container/types';
import { DocumentType } from '@domain/shared';

@injectable()
export class CreateOwnerService implements CreateOwner {
  constructor(
    @inject(OwnerTypes.OwnerReadRepository)
    private readonly ownersReadRepository: OwnersReadRepository,

    @inject(OwnerTypes.OwnerWriteRepository)
    private readonly ownersWriteRepository: OwnersWriteRepository
  ) {}

  async create({
    name,
    documentNumber,
    documentType
  }: CreateOwnerDTO): Promise<RepositoryOwnerModel> {
    const document = new DocumentModel({
      number: documentNumber,
      type: documentType as DocumentType
    });

    const owner = new OwnerModel({
      name,
      document
    });

    const foundOwner = await this.ownersReadRepository.findOwnerByDocument(
      document
    );

    if (foundOwner) {
      throw new DocumentAlreadyExistsException();
    }

    const repositoryWriteOwner = await this.ownersWriteRepository.create(owner);

    await this.ownersReadRepository.create(repositoryWriteOwner);

    return repositoryWriteOwner;
  }
}
