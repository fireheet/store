import { OwnerProps } from '@core/owner/domain/types';
import { DocumentFactory } from '@core/shared/domain/value_objects';
import { Owner } from '../entities';
import { OwnerValidatorFactory } from './OwnerValidatorFactory';

export class OwnerFactory {
  static create({ documentNumber, ...owner }: OwnerProps): Owner {
    const document = DocumentFactory.create({
      number: documentNumber
    });

    return new Owner({ ...owner, document }, OwnerValidatorFactory.create());
  }
}
