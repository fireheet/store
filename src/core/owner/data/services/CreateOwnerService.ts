import { DocumentAlreadyExistsException } from '@core/shared/data/contracts';
import { OwnerModel } from '@core/owner/data/models';
import { inject, injectable } from 'inversify';
import { DocumentType } from '@core/shared/domain/value_objects';
import { CreateOwner } from '@core/owner/domain/usecases';
import { DocumentModel } from '@core/shared/data/models/value_objects';
import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts';
import {
  OWNER_READ_REPOSITORY,
  OWNER_WRITE_REPOSITORY
} from '@core/owner/config/types';
import {
  InputCreateOwnerDTO,
  OutputCreateOwnerDTO
} from '@core/owner/domain/dtos';

@injectable()
export class CreateOwnerService implements CreateOwner {
  constructor(
    @inject(OWNER_READ_REPOSITORY)
    private readonly ownerReadRepository: OwnerReadRepository,

    @inject(OWNER_WRITE_REPOSITORY)
    private readonly ownerWriteRepository: OwnerWriteRepository
  ) {}

  async create({
    name,
    documentNumber
  }: InputCreateOwnerDTO): Promise<OutputCreateOwnerDTO> {
    const document = new DocumentModel({
      number: documentNumber,
      type: DocumentType.CPF
    });

    const owner = new OwnerModel({
      name,
      document
    });

    const foundDocument = await this.ownerReadRepository.findByDocument(
      document
    );

    if (foundDocument) {
      throw new DocumentAlreadyExistsException();
    }

    const repositoryOwnerDto = await this.ownerWriteRepository.create(owner);

    await this.ownerReadRepository.create(repositoryOwnerDto);

    return repositoryOwnerDto;
  }
}
