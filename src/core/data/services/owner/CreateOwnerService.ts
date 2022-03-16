import { CreateOwner } from '@domain/usecases/owner';
import { CreateOwnerDTO } from '@data/dtos';
import {
  OwnersReadRepository,
  OwnersWriteRepository
} from '@data/contracts/repositories';
import { DocumentAlreadyExistsException } from '@data/contracts/exceptions';
import { OwnerModel, RepositoryOwnerModel } from '@data/models';
import { inject, injectable } from 'inversify';
import { OwnerTypes } from '@core/types';

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

    const owner = new OwnerModel(ownerDto);

    return this.ownersWriteRepository.save(owner);
  }
}
