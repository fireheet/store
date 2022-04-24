import { InputShowOwnerDTO, OutputShowOwnerDTO } from '@core/owner/domain/dtos';
import { inject } from 'inversify';
import { OwnerReadRepository } from '@core/owner/data/contracts';
import {
  IDDoesNotExistException,
  InvalidParameterException
} from '@core/shared/data/contracts';
import { OWNER_READ_REPOSITORY } from '@core/owner/config/types';
import { ShowOwner } from '@core/owner/domain/usecases';

export class ShowOwnerUseCase implements ShowOwner {
  constructor(
    @inject(OWNER_READ_REPOSITORY)
    private readonly ownerReadRepository: OwnerReadRepository
  ) {}

  async show({ id }: InputShowOwnerDTO): Promise<OutputShowOwnerDTO> {
    if (!id) {
      throw new InvalidParameterException('id');
    }

    const owner = await this.ownerReadRepository.findByID(id);

    if (!owner) {
      throw new IDDoesNotExistException();
    }

    return owner;
  }
}
