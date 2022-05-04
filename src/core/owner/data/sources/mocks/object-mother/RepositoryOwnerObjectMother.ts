import { RepositoryOwner } from '../../../entities';
import { RepositoryOwnerDataBuilder } from '../data-builder';

export class RepositoryOwnerObjectMother {
  static valid(): RepositoryOwner {
    return RepositoryOwnerDataBuilder.aRepositoryOwner().valid().build();
  }

  static disabled(): RepositoryOwner {
    return RepositoryOwnerDataBuilder.aRepositoryOwner().disabled().build();
  }
}
