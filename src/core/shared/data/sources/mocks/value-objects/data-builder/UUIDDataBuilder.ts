import { UUID, UUIDValidatorFactory } from '@core/shared/domain/value-objects';

export class UUIDDataBuilder {
  #uuidData: UUID;

  constructor() {
    this.#uuidData = new UUID(
      {
        id: '8aa28ded-0aa1-4a78-aca2-3962437e6085',
        version: 'v4'
      },
      UUIDValidatorFactory.create()
    );
  }

  static aUUID(): UUIDDataBuilder {
    return new UUIDDataBuilder();
  }

  valid(): UUIDDataBuilder {
    return this;
  }

  build(): UUID {
    return this.#uuidData;
  }
}
