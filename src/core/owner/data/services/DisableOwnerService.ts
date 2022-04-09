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
import {
  IDDoesNotExistException,
  InvalidParameterException
} from '@core/shared/data';
import { InputDisableOwnerDTO } from '@core/owner/domain/dtos/disable-owner';

@injectable()
export class DisableOwnerService implements DisableOwner {
  constructor(
    @inject(OWNER_READ_REPOSITORY)
    private readonly ownerReadRepository: OwnerReadRepository,

    @inject(OWNER_WRITE_REPOSITORY)
    private readonly ownerWriteRepository: OwnerWriteRepository
  ) {}

  async disable({ id }: InputDisableOwnerDTO): Promise<boolean> {
    if (!id) {
      throw new InvalidParameterException('id');
    }

    const owner = await this.ownerReadRepository.findByID(id);

    if (!owner) {
      throw new IDDoesNotExistException();
    }

    await this.ownerWriteRepository.disable({ id });

    return this.ownerReadRepository.disable({ id });
  }
}
