import { DocumentAlreadyExistsException } from '@core/shared/data/contracts';
import { OwnerModel, RepositoryOwnerModel } from '@core/owner/data/models';
import { inject, injectable } from 'inversify';
import { DocumentType } from '@core/shared/domain/value_objects';
import { CreateOwner } from '@core/owner/domain/usecases';
import { DocumentModel } from '@core/shared/data/models/value_objects';
import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts';
import { OwnerTypes } from '@core/owner/config/types';
import { CreateOwnerDTO } from '../dtos';

@injectable()
export class CreateOwnerService implements CreateOwner {
  constructor(
    @inject(OwnerTypes.OwnerReadRepository)
    private readonly ownerReadRepository: OwnerReadRepository,

    @inject(OwnerTypes.OwnerWriteRepository)
    private readonly ownerWriteRepository: OwnerWriteRepository
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

    const foundOwner = await this.ownerReadRepository.findByDocument(document);

    if (foundOwner) {
      throw new DocumentAlreadyExistsException();
    }

    const repositoryWriteOwner = await this.ownerWriteRepository.create(owner);

    await this.ownerReadRepository.create(repositoryWriteOwner);

    return repositoryWriteOwner;
  }
}
