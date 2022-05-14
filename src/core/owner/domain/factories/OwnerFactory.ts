import { OwnerProps } from '@core/owner/domain/types';
import {
  DocumentFactory,
  UUIDFactory
} from '@core/shared/domain/value-objects';
import { Owner } from '../entities';
import { OwnerValidatorFactory } from './OwnerValidatorFactory';

export class OwnerFactory {
  static create({ id, documentNumber, ...owner }: OwnerProps): Owner {
    const document = DocumentFactory.create({
      number: documentNumber
    });

    return new Owner(
      { id: UUIDFactory.create(), ...owner, document },
      OwnerValidatorFactory.create()
    );
  }
}
