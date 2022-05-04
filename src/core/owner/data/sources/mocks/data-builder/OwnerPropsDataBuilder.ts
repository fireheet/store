import { OwnerProps } from '@core/owner/domain/types';
import * as uuid from 'uuid';

export class OwnerPropsDataBuilder {
  #ownerData: OwnerProps;

  constructor() {
    this.#ownerData = {
      id: uuid.v4(),
      name: 'John',
      documentNumber: '12345678901'
    };
  }

  static props(): OwnerPropsDataBuilder {
    return new OwnerPropsDataBuilder();
  }

  valid(): OwnerPropsDataBuilder {
    return this;
  }

  withoutID(): OwnerPropsDataBuilder {
    Reflect.deleteProperty(this.#ownerData, 'id');
    return this;
  }

  withoutName(): OwnerPropsDataBuilder {
    Reflect.deleteProperty(this.#ownerData, 'name');
    return this;
  }

  blankName(): OwnerPropsDataBuilder {
    this.#ownerData.name = '';
    return this;
  }

  invalidName(): OwnerPropsDataBuilder {
    this.#ownerData.name = 'K$%n4';
    return this;
  }

  longName(): OwnerPropsDataBuilder {
    this.#ownerData.name = 'a'.repeat(151);
    return this;
  }

  withoutDocumentNumber(): OwnerPropsDataBuilder {
    Reflect.deleteProperty(this.#ownerData, 'documentNumber');
    return this;
  }

  invalidDocumentNumber(): OwnerPropsDataBuilder {
    this.#ownerData.documentNumber = 'aaaaaaaaaaa';
    return this;
  }

  blankDocumentNumber(): OwnerPropsDataBuilder {
    this.#ownerData.documentNumber = '';
    return this;
  }

  build(): OwnerProps {
    return this.#ownerData;
  }
}
