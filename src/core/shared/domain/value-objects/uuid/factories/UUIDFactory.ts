import * as uuid from 'uuid';
import { UUID } from '../UUID';
import { UUIDValidatorFactory } from './UUIDValidatorFactory';

export class UUIDFactory {
  static create(): UUID {
    return new UUID(
      { id: uuid.v4(), version: 'v4' },
      UUIDValidatorFactory.create()
    );
  }
}
