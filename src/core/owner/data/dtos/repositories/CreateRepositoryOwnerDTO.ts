import { DocumentModel } from '@core/shared/data/models';

export type CreateRepositoryOwnerDTO = {
  name: string;

  document: DocumentModel;
};
