import { DocumentModel } from '@core/shared/data';
import { DocumentType } from '@core/shared/domain/value_objects';
import { Validation } from '../../../../shared/data/sources';
import { RepositoryOwnerModel } from '../../models';

export const RepositoryOwnerModelMock = () =>
  new RepositoryOwnerModel({
    id: '1',
    name: 'Test',
    document: new DocumentModel({
      type: DocumentType.CPF,
      number: '12345678901'
    }),
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    validation: new Validation('owner')
  });
