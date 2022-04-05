import { OwnerModel } from '@core/owner/data/models';
import { RandomInRange } from '@core/shared/data/sources';
import { DocumentType } from '@core/shared/domain/value_objects';
import { DocumentModel } from '@core/shared/data/models/value_objects';
import {
  InputCreateOwnerDTO,
  InputUpdateOwnerDTO
} from '@core/owner/domain/dtos';
import { RepositoryOwnerDTO } from '../../dtos';

export type FactoryOptions = {
  id?: string;
  name?: string;
  document?: DocumentModel;
  documentNumber?: string;
  documentType?: string;
};

const minCPFValue = 10000000000;
const maxCPFValue = 99999999999;

export class OwnerMockFactory {
  static makeOwnerModel = (options: FactoryOptions = {}): OwnerModel => {
    const ownerModel: OwnerModel = new OwnerModel({
      name: options.name || 'New',
      document:
        options.document ||
        new DocumentModel({
          number:
            options.documentNumber ||
            RandomInRange(minCPFValue, maxCPFValue).toString(),
          type: DocumentType.CPF
        })
    });

    return ownerModel;
  };

  static makeInputCreateOwnerDTO = (
    options: FactoryOptions = {}
  ): InputCreateOwnerDTO => {
    return {
      name: options.name || 'John Doe',
      documentNumber:
        options.documentNumber ||
        RandomInRange(minCPFValue, maxCPFValue).toString()
    };
  };

  static makeInputUpdateOwnerDTO = (
    options: FactoryOptions = {}
  ): InputUpdateOwnerDTO => {
    return {
      id: options.id || '1234',
      name: options.name || 'John Doe'
    };
  };

  static makeRepositoryOwnerDTO = (
    options: FactoryOptions = {}
  ): RepositoryOwnerDTO => {
    return {
      id: options.id || RandomInRange(1, 100).toString(),
      name: options.name || 'John Doe',
      document:
        options.document ||
        new DocumentModel({
          number: RandomInRange(minCPFValue, maxCPFValue).toString(),
          type: DocumentType.CPF
        }),
      isEnabled: true,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
      enabled_at: new Date(),
      disabled_at: null
    };
  };
}
