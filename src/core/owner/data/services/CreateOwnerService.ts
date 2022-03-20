import { DocumentAlreadyExistsException } from '@core/shared/data/contracts';
import { OwnerModel, RepositoryOwnerModel } from '@core/owner/data/models';
import { inject, injectable } from 'inversify';
import { DocumentType } from '@core/shared/domain/value_objects';
import { CreateOwner } from '@core/owner/domain/usecases';
import { DocumentModel } from '@core/shared/data/models/value_objects';
import {
  OwnersReadRepository,
  OwnersWriteRepository
} from '@core/owner/data/contracts';
import { OwnerTypes } from '@core/owner/config/types';
import { CreateOwnerDTO } from '../dtos';

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
