import { DocumentType } from '@core/shared/domain/value_objects/enums';

export type DocumentProps = {
  number: string;

  type: DocumentType;
};
