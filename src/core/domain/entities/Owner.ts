import { Document } from '@domain/value_objects/Document';
import { OwnerConstants } from '@constants/domain';

export class Owner {
  name!: string;

  document!: Document;

  isEnabled = true;

  constructor(data: Partial<Owner>) {
    Object.assign(this, data);

    this.validateOwner();
  }

  private validateOwner() {
    const nameMaxLength = OwnerConstants.NAME_MAX_LENGTH;

    if (!(this.name && this.document)) {
      throw new Error('Owner values must not be null!');
    }

    if (this.name.length > nameMaxLength) {
      throw new Error(
        `Owner name must be less than ${nameMaxLength} characters!`
      );
    }
  }
}
