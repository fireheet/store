import { Document } from '@core/shared/domain/value_objects';
import {
  InvalidNameException,
  NullValuesException
} from '@core/shared/data/contracts';
import { OwnerConstants } from '@core/owner/config';

export class Owner {
  id!: string;

  name!: string;

  document!: Document;

  isEnabled = true;

  constructor(data: Partial<Owner>) {
    Object.assign(this, data);

    this.validateOwner();
  }

  private validateOwner() {
    const nameMaxLength = OwnerConstants.NAME_MAX_LENGTH;

    if (!this.name || !this.document) {
      throw new NullValuesException();
    }

    if (this.name.length > nameMaxLength) {
      throw new InvalidNameException(
        `Owner name must be less than ${nameMaxLength} characters!`
      );
    }
  }
}
