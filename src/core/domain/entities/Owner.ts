import { Document } from '@domain/value_objects/Document';
import { Store } from '@domain/entities/Store';

export class Owner {
  name!: string;

  document!: Document;

  ownedStore!: Store;

  isEnabled = true;

  constructor(data: Partial<Owner>) {
    Object.assign(this, data);

    this.validateOwner();
  }

  validateOwner() {
    if (!(this.name && this.document && this.ownedStore)) {
      throw new Error('Owner values must not be null!');
    }

    if (this.name.length > 150) {
      throw new Error('Owner name must be less than 150 characters!');
    }
  }
}
