import { RepositoryOwnerModel } from '@core/owner/data/models';
import { CreateOwnerDTO } from '@core/owner/data/dtos';
import { RandomInRange } from '@core/shared/data/sources';
import { DocumentType } from '@core/shared/domain/value_objects';
import { DocumentModel } from '@core/shared/data/models/value_objects';

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
