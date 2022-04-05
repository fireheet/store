import { Address, Document, Phone } from '@core/shared/domain';
import { StoreConstants } from '@core/store/config';
import { Availability } from '../value_objects/Availability';

export class Store {
  id!: string;

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
    const nameMaxLength = StoreConstants.NAME_MAX_LENGTH;

    if (!(this.name && this.address && this.phone && this.document)) {
      throw new Error('Store values must not be null!');
    }

    if (this.name.length > nameMaxLength) {
      throw new Error(
        `Store name must be less than ${nameMaxLength} characters!`
      );
    }
  }
}
