import {
  DocumentFactory,
  DocumentType
} from '@core/shared/domain/value_objects';
import * as uuid from 'uuid';
import { Owner } from '@core/owner/domain/entities';
import { OwnerValidatorFactory } from '@core/owner/domain/factories';

export class OwnerDataBuilder {
  #ownerData: Owner;

  constructor() {
    this.#ownerData = new Owner(
      {
        id: uuid.v4(),
        name: 'John',
        document: DocumentFactory.create({ number: '12345678901' })
      },
      OwnerValidatorFactory.create()
    );
  }

  static aOwner(): OwnerDataBuilder {
    return new OwnerDataBuilder();
  }

  valid(): OwnerDataBuilder {
    return this;
  }

  invalidName(): OwnerDataBuilder {
    this.#ownerData.name = 'N@m$%';
    return this;
  }

  withoutName(): OwnerDataBuilder {
    Reflect.deleteProperty(this.#ownerData, 'name');
    return this;
  }

  withoutDocument(): OwnerDataBuilder {
    Reflect.deleteProperty(this.#ownerData, 'document');
    return this;
  }

  withoutID(): OwnerDataBuilder {
    Reflect.deleteProperty(this.#ownerData, '_id');
    return this;
  }

  invalidID(): OwnerDataBuilder {
    this.#ownerData.id = 'aaaaaaaaaaaaa';
    return this;
  }

  longName(): OwnerDataBuilder {
    this.#ownerData.name = 'a'.repeat(151);
    return this;
  }

  invalidDocumentNumber(): OwnerDataBuilder {
    this.#ownerData.document.number = 'a'.repeat(11);
    return this;
  }

  longDocumentNumber(): OwnerDataBuilder {
    this.#ownerData.document.number = '1'.repeat(12);
    return this;
  }

  invalidDocumentType(): OwnerDataBuilder {
    this.#ownerData.document.type = DocumentType.CNPJ;
    return this;
  }

  build(): Owner {
    return this.#ownerData;
  }
}
