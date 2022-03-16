import { CreateOwner } from '@domain/usecases/owner';
import { CreateOwnerDTO } from '@data/dtos';
import {
  OwnersReadRepository,
  OwnersWriteRepository
} from '@data/contracts/repositories';
import { DocumentAlreadyExistsException } from '@data/contracts/exceptions';
import { RepositoryOwnerModel } from '@data/models';
import { inject, injectable } from 'inversify';
import { OwnerTypes } from '@config/container/types';

@injectable()
export class CreateOwnerService implements CreateOwner {
  constructor(
    @inject(OwnerTypes.OwnerReadRepository)
    private readonly ownersReadRepository: OwnersReadRepository,

    @inject(OwnerTypes.OwnerWriteRepository)
    private readonly ownersWriteRepository: OwnersWriteRepository
  ) {}

  async create(ownerDto: CreateOwnerDTO): Promise<RepositoryOwnerModel> {
    const foundOwner = await this.ownersReadRepository.findOwnerByDocument(
      ownerDto.document
    );

    if (foundOwner) {
      throw new DocumentAlreadyExistsException();
    }

    const repositoryWriteOwner = await this.ownersWriteRepository.create(
      ownerDto
    );

    await this.ownersReadRepository.create(repositoryWriteOwner);

    return repositoryWriteOwner;
  }
}
