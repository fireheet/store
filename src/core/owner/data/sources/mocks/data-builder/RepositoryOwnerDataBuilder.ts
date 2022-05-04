import { Document, DocumentType } from '@core/shared/domain/value-objects';
import { RepositoryOwner } from '@core/owner/data/entities';

export class RepositoryOwnerDataBuilder {
  #repositoryOwnerData: RepositoryOwner;

  constructor() {
    this.#repositoryOwnerData = new RepositoryOwner({
      id: '0df95189-856d-4e8b-9b4f-2a802dd80b3c',
      name: 'John',
      document: new Document(
        {
          number: '12345678901',
          type: DocumentType.CPF
        },
        {
          validate: () => {
            return true;
          }
        }
      ),
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
