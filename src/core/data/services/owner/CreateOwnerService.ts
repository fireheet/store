import { CreateOwner } from '@domain/usecases/owner';
import { CreateOwnerDTO } from '@data/dtos';
import {
  OwnersReadRepository,
  OwnersWriteRepository,
} from '@data/contracts/repositories';
import { DocumentAlreadyExistsException } from '@data/contracts/exceptions';
import { OwnerModel } from '@data/models';

export class CreateOwnerService implements CreateOwner {
  constructor(
    private readonly ownersReadRepository: OwnersReadRepository,
    private readonly ownersWriteRepository: OwnersWriteRepository,
  ) {}

  async create(ownerDto: CreateOwnerDTO): Promise<OwnerModel> {
    const owner = await this.ownersReadRepository.findOwnerByDocument(
      ownerDto.document,
    );

    if (owner) {
      throw new DocumentAlreadyExistsException();
    }

    return this.ownersWriteRepository.save(ownerDto);
  }
}
