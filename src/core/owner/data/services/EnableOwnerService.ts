import { inject, injectable } from 'inversify';
import { EnableOwner } from '@core/owner/domain/usecases';
import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts';
import {
  OWNER_READ_REPOSITORY,
  OWNER_WRITE_REPOSITORY
} from '@core/owner/config/types';
import { InputEnableOwnerDTO } from '@core/owner/domain/dtos/enable-owner';
import {
  IDDoesNotExistException,
  InvalidParameterException
} from '@core/shared/data/contracts';

@injectable()
export class EnableOwnerService implements EnableOwner {
  constructor(
    @inject(OWNER_READ_REPOSITORY)
    private readonly ownerReadRepository: OwnerReadRepository,

    @inject(OWNER_WRITE_REPOSITORY)
    private readonly ownerWriteRepository: OwnerWriteRepository
  ) {}

  async enable({ id }: InputEnableOwnerDTO): Promise<boolean> {
    if (!id) {
      throw new InvalidParameterException('id');
    }

    const owner = await this.ownerReadRepository.findByID(id);

    if (!owner) {
      throw new IDDoesNotExistException();
    }

    await this.ownerWriteRepository.enable({ id });

    return this.ownerReadRepository.enable({ id });
  }
}
