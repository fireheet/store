import { inject, injectable } from 'inversify';
import { EnableOwner } from '@core/owner/domain/usecases';
import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts';
import {
  OWNER_READ_REPOSITORY,
  OWNER_WRITE_REPOSITORY
} from '../../config/types';
import { EnableOwnerDTO } from '../dtos';

@injectable()
export class EnableOwnerService implements EnableOwner {
  constructor(
    @inject(OWNER_READ_REPOSITORY)
    private readonly ownerReadRepository: OwnerReadRepository,

    @inject(OWNER_WRITE_REPOSITORY)
    private readonly ownerWriteRepository: OwnerWriteRepository
  ) {}

  async enable({ id }: EnableOwnerDTO): Promise<boolean> {
    return Promise.resolve(true);
  }
}
