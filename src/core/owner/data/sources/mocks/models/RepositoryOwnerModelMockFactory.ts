import { DocumentModel } from '@core/shared/data/models';
import { Validation } from '@core/shared/data/sources';
import {
  DocumentType,
  DocumentValidatorFactory
} from '@core/shared/domain/value_objects';
import { RepositoryOwnerModel } from '@core/owner/data/models';

type MockOptions = {
  id?: string;
  name?: string;
  documentNumber?: string;
};

export const RepositoryOwnerModelMockFactory = (opts?: MockOptions) =>
  new RepositoryOwnerModel({
    id: opts?.id || '1',
    name: opts?.name || 'Test',
    document: new DocumentModel(
      {
        type: DocumentType.CPF,
        number: opts?.documentNumber || '12345678901'
      },
      DocumentValidatorFactory.create()
    ),
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    validation: new Validation()
  });
