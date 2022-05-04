import { RepositoryOwner } from '../RepositoryOwner';
import { RepositoryOwnerProps } from '../types';

export class RepositoryOwnerFactory {
  static create({ ...owner }: RepositoryOwnerProps): RepositoryOwner {
    return new RepositoryOwner({
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
      ...owner
    });
  }
}
