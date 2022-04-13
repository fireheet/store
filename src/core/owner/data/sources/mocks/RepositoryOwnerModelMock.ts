import { DocumentModel } from '@core/shared/data';
import { Validation } from '@core/shared/data/sources';
import { DocumentType } from '@core/shared/domain/document/enums';
import { RepositoryOwnerModel } from '../../models';

type MockOptions = {
  id?: string;
  name?: string;
  documentNumber?: string;
};

export const RepositoryOwnerModelMock = (opts?: MockOptions) =>
  new RepositoryOwnerModel({
    id: opts?.id || '1',
    name: opts?.name || 'Test',
    document: new DocumentModel({
      type: DocumentType.CPF,
      number: opts?.documentNumber || '12345678901'
    }),
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    validation: new Validation()
  });
