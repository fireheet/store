import { inject, injectable } from 'inversify';
import { DisableOwner } from '@core/owner/domain/usecases';
import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts';
import {
  OWNER_READ_REPOSITORY,
  OWNER_WRITE_REPOSITORY
} from '@core/owner/config/types';
import { IDDoesNotExistException } from '@core/shared/data/contracts';
import { InputDisableOwnerDTO } from '@core/owner/domain/dtos';

@injectable()
export class DisableOwnerUseCase implements DisableOwner {
  constructor(
    @inject(OWNER_READ_REPOSITORY)
    private readonly ownerReadRepository: OwnerReadRepository,

    @inject(OWNER_WRITE_REPOSITORY)
    private readonly ownerWriteRepository: OwnerWriteRepository
  ) {}

  async disable({ id }: InputDisableOwnerDTO): Promise<boolean> {
    const owner = await this.ownerReadRepository.findByID(id);

    if (!owner) {
      throw new IDDoesNotExistException();
    }

    await this.ownerWriteRepository.disable({ id });

    return this.ownerReadRepository.disable({ id });
  }
}
