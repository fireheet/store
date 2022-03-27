import { ShowOwner } from '@core/owner/domain';
import { inject } from 'inversify';
import { OwnerReadRepository } from '@core/owner/data/contracts';
import { RepositoryOwnerModel } from '@core/owner/data/models';
import { ShowOwnerDTO } from '@core/owner/data/dtos/ShowOwnerDTO';
import { IDDoesNotExistException } from '@core/shared/data';
import { OWNER_READ_REPOSITORY } from '@core/owner/config/types';

export class ShowOwnerService implements ShowOwner {
  constructor(
    @inject(OWNER_READ_REPOSITORY)
    private readonly ownerReadRepository: OwnerReadRepository
  ) {}

  async show({ id }: ShowOwnerDTO): Promise<RepositoryOwnerModel> {
    let owner: RepositoryOwnerModel | undefined;

    if (id) {
      owner = await this.ownerReadRepository.findByID(id);
    }

    if (!owner) {
      throw new IDDoesNotExistException();
    }

    return owner;
  }
}
