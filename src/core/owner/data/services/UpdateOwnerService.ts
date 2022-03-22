import { inject, injectable } from 'inversify';
import { UpdateOwner } from '@core/owner/domain/usecases';
import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts';
import { OwnerTypes } from '@core/owner/config/types';
import { IDDoesNotExistException } from '@core/shared/data';
import { UpdateOwnerDTO } from '../dtos';
import { RepositoryOwnerModel } from '../models';

@injectable()
export class UpdateOwnerService implements UpdateOwner {
  constructor(
    @inject(OwnerTypes.OwnerReadRepository)
    private readonly ownerReadRepository: OwnerReadRepository,

    @inject(OwnerTypes.OwnerWriteRepository)
    private readonly ownerWriteRepository: OwnerWriteRepository
  ) {}

  async update({ id, name }: UpdateOwnerDTO): Promise<boolean> {
    const owner = await this.ownerReadRepository.findByID(id);

    if (!owner) {
      throw new IDDoesNotExistException();
    }

    const newOwner = new RepositoryOwnerModel({ ...owner, name });

    await this.ownerWriteRepository.update(newOwner);

    return this.ownerReadRepository.replace(newOwner);
  }
}
