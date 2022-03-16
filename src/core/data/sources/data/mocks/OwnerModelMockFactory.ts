import { DocumentModel, RepositoryOwnerModel } from '@data/models';
import { DocumentType } from '@domain/value_objects/types';
import { CreateOwnerDTO } from '@data/dtos';
import { RandomInRange } from '@data/sources/utils';

export type FactoryOptions = {
  name?: string;
  document?: DocumentModel;
};

const minCPFValue = 10000000000;
const maxCPFValue = 99999999999;

export class OwnerModelMockFactory {
  static makeCreateOwnerDTO(options: FactoryOptions = {}) {
    const ownerDto: CreateOwnerDTO = {
      name: options.name || 'John Doe',
      documentNumber: RandomInRange(minCPFValue, maxCPFValue).toString(),
      documentType: DocumentType.CPF
    };

    return ownerDto;
  }

  static makeRepositoryOwnerModel(options: FactoryOptions = {}) {
    return new RepositoryOwnerModel({
      name: options.name || 'John Doe',
      document:
        options.document ||
        new DocumentModel({
          number: RandomInRange(minCPFValue, maxCPFValue).toString(),
          type: DocumentType.CPF
        })
    });
  }
}
