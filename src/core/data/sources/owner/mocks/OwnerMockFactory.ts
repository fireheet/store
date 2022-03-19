import { DocumentModel, RepositoryOwnerModel } from '@data/models';
import { CreateOwnerDTO } from '@data/dtos';
import { RandomInRange } from '@data/sources/utils';
import { DocumentType } from '@domain/shared';

export type FactoryOptions = {
  name?: string;
  document?: DocumentModel;
  documentNumber?: string;
  documentType?: string;
};

const minCPFValue = 10000000000;
const maxCPFValue = 99999999999;

export class OwnerMockFactory {
  static makeCreateOwnerDTO = (
    options: FactoryOptions = {}
  ): CreateOwnerDTO => {
    const ownerDto: CreateOwnerDTO = {
      name: options.name || 'John Doe',
      documentNumber:
        options.documentNumber ||
        RandomInRange(minCPFValue, maxCPFValue).toString(),
      documentType: options.documentType || DocumentType.CPF
    };

    return ownerDto;
  };

  static makeRepositoryOwnerModel = (
    options: FactoryOptions = {}
  ): RepositoryOwnerModel => {
    return new RepositoryOwnerModel({
      name: options.name || 'John Doe',
      document:
        options.document ||
        new DocumentModel({
          number: RandomInRange(minCPFValue, maxCPFValue).toString(),
          type: DocumentType.CPF
        })
    });
  };
}
