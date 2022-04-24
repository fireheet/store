import { DocumentFactory } from '@core/shared/domain/value_objects';
import { RepositoryOwner } from '@core/owner/data/entities';
import * as uuid from 'uuid';

export class RepositoryOwnerDataBuilder {
  #repositoryOwnerData: RepositoryOwner;

  constructor() {
    this.#repositoryOwnerData = new RepositoryOwner({
      id: uuid.v4(),
      name: 'John',
      document: DocumentFactory.create({ number: '12345678901' }),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined
    });
  }

  static aRepositoryOwner(): RepositoryOwnerDataBuilder {
    return new RepositoryOwnerDataBuilder();
  }

  valid(): RepositoryOwnerDataBuilder {
    return this;
  }

  disabled(): RepositoryOwnerDataBuilder {
    this.#repositoryOwnerData.deleted_at = new Date();

    return this;
  }

  build(): RepositoryOwner {
    return this.#repositoryOwnerData;
  }
}
