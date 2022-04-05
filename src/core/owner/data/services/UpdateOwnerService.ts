import { inject, injectable } from 'inversify';
import { UpdateOwner } from '@core/owner/domain/usecases';
import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts';
import { IDDoesNotExistException } from '@core/shared/data';
import {
  OWNER_READ_REPOSITORY,
  OWNER_WRITE_REPOSITORY
} from '../../config/types';
import { InputUpdateOwnerDTO } from '../../domain/dtos';
import { OwnerModel } from '../models';

@injectable()
export class UpdateOwnerService implements UpdateOwner {
  constructor(
    @inject(OWNER_READ_REPOSITORY)
    private readonly ownerReadRepository: OwnerReadRepository,

    @inject(OWNER_WRITE_REPOSITORY)
    private readonly ownerWriteRepository: OwnerWriteRepository
  ) {}

  async update({ id, name }: InputUpdateOwnerDTO): Promise<boolean> {
    const owner = await this.ownerReadRepository.findByID(id);

    if (!owner) {
      throw new IDDoesNotExistException();
    }

    const newOwner = new OwnerModel({
      name,
      document: owner.document,
      id: owner.id
    });

    const output = { ...owner, ...newOwner };

    await this.ownerWriteRepository.update(newOwner);

    return this.ownerReadRepository.replace(output);
  }
}
