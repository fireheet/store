import { DocumentAlreadyExistsException } from '@core/shared/data/contracts';
import { inject, injectable } from 'inversify';
import { CreateOwner } from '@core/owner/domain/usecases';
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
import { OwnerFactory } from '../../domain/factories';

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
    const owner = OwnerFactory.create({
      name,
      documentNumber
    });

    const foundDocument = await this.ownerReadRepository.findByDocument(
      owner.document
    );

    if (foundDocument) {
      throw new DocumentAlreadyExistsException();
    }

    const repositoryOwner = await this.ownerWriteRepository.create(owner);

    await this.ownerReadRepository.create(repositoryOwner);

    return repositoryOwner;
  }
}
