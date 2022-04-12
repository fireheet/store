import { Document, DocumentType } from '@core/shared/domain/value_objects';
import { OwnerProps } from '@core/owner/data/contracts/domain';
import { Owner } from '../entities';

export class OwnerFactory {
  static create(ownerProps: OwnerProps): Owner {
    const document = new Document({
      number: ownerProps.documentNumber,
      type: DocumentType.CPF
    });

    return new Owner({ ...ownerProps, document });
  }
}
