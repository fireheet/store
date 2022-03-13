import { Document, Address, Phone, Availability } from '@domain/value_objects';

export class Store {
  name!: string;

  logo?: string;

  address!: Address;

  phone!: Phone;

  Availability?: Availability;

  slogan?: string;

  document!: Document;

  isEnabled = false;

  stars = 0;

  constructor(data: Partial<Store>) {
    Object.assign(this, data);

    this.validateStore();
  }

  validateStore() {
    if (!(this.name && this.address && this.phone && this.document)) {
      throw new Error('Store values must not be null!');
    }

    if (this.name.length > 100) {
      throw new Error('Store name must be less than 100 characters!');
    }
  }
}
