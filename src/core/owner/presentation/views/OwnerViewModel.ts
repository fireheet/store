import { OwnerModel, RepositoryOwnerModel } from '@core/owner/data';

type FieldsToRemove = 'document' | 'store';

type ViewModel = Omit<OwnerModel, FieldsToRemove>;

export class OwnerViewModel implements ViewModel {
  constructor(owner: Partial<RepositoryOwnerModel>) {
    Object.assign(this, owner);
  }

  name!: string;

  isEnabled!: boolean;
}
