import { OwnerProps } from '@core/owner/domain/types';
import { DocumentFactory } from '@core/shared/domain/value_objects';
import * as uuid from 'uuid';
import { Owner } from '../entities';
import { OwnerValidatorFactory } from './OwnerValidatorFactory';

export class OwnerFactory {
  static create({ documentNumber, ...owner }: OwnerProps): Owner {
    const document = DocumentFactory.create({
      number: documentNumber
    });

    return new Owner(
      { id: uuid.v4(), ...owner, document },
      OwnerValidatorFactory.create()
    );
  }
}
