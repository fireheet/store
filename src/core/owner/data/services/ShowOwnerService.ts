import { ShowOwner } from '@core/owner/domain';
import { OwnerTypes } from '@core/owner/config/types';
import { inject } from 'inversify';
import { OwnerReadRepository } from '@core/owner/data/contracts';
import { RepositoryOwnerModel } from '@core/owner/data/models';
import { ShowOwnerDTO } from '@core/owner/data/dtos/ShowOwnerDTO';

export class ShowOwnerService implements ShowOwner {
  constructor(
    @inject(OwnerTypes.OwnerReadRepository)
    private readonly ownerReadRepository: OwnerReadRepository
  ) {}

  async show({ id }: ShowOwnerDTO): Promise<RepositoryOwnerModel> {
    let owner: RepositoryOwnerModel | undefined;

    if (id) {
      owner = await this.ownerReadRepository.findByID(id);
    }

    if (!owner) {
      throw new Error('Owner not found!');
    }

    return owner;
  }
}
