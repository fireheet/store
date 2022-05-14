import { UUID } from '@core/shared/domain/value-objects';
import { UUIDDataBuilder } from '../data-builder';

export class UUIDObjectMother {
  static valid(): UUID {
    return UUIDDataBuilder.aUUID().valid().build();
  }
}
