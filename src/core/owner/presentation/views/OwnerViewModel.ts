import { OwnerModel } from '@core/owner/data';

type FieldsToRemove = 'document' | 'store';

type ViewModel = Omit<OwnerModel, FieldsToRemove>;

export class OwnerViewModel implements ViewModel {
  name!: string;

  isEnabled!: boolean;
}
