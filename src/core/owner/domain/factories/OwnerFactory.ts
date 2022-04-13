/* eslint-disable import/no-cycle */
import { OwnerProps } from '@core/owner/data/contracts/domain';
import { DocumentFactory } from '../../../shared/domain/document/factories/DocumentFactory';
import { Owner } from '../entities';

export class OwnerFactory {
  static create({ id, name, documentNumber }: OwnerProps): Owner {
    const document = DocumentFactory.create({
      number: documentNumber
    });

    return new Owner({ id, name, document });
  }
}
