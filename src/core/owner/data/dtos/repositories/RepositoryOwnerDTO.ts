import {
  DocumentModel,
  RepositoryFields,
  RepositoryStatusFields
} from '@core/shared/data';

export interface RepositoryOwnerDTO
  extends RepositoryFields,
    RepositoryStatusFields {
  id: string;

  name: string;

  document: DocumentModel;

  isEnabled: boolean;
}
