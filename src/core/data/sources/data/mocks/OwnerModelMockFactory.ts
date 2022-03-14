import { DocumentModel, OwnerModel } from '@data/models';
import { DocumentType } from '@domain/value_objects/types';

export type FactoryOptions = {
  name?: string;
  document?: DocumentModel;
};

export class OwnerModelMockFactory {
  static makeOwnerModel(options: FactoryOptions = {}) {
    return new OwnerModel({
      name: 'John Doe' || options.name,
      document:
        new DocumentModel({
          number: '12345678901',
          type: DocumentType.CPF,
        }) || options.document,
    });
  }
}
