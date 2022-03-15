import { PhoneConstants } from '@constants/domain/value_objects';

export class Phone {
  country_code!: string;

  prefix!: string;

  number!: string;

  is_verified = false;

  constructor(data: Partial<Phone>) {
    Object.assign(this, data);

    this.validatePhone();
  }

  validatePhone(): void {
    if (!(this.country_code && this.prefix && this.number)) {
      throw new Error('Phone values must not be null!');
    }

    this.validateCountryCode();
    this.validatePhoneByCountryCode();
  }

  validateCountryCode(): void {
    const countryCodeLength = PhoneConstants.COUNTRY_CODE_LENGTH;

    if (this.country_code.length !== countryCodeLength) {
      throw new Error('Invalid country code');
    }

    if (!/^[0-9]+$/.test(this.country_code)) {
      throw new Error('Invalid country code');
    }

    this.country_code = `+${this.country_code}`;
  }

  validatePhoneByCountryCode(): void {
    // TODO Search for country codes and redo this validation
    if (this.country_code === '+55') {
      this.validateBrazilPhone();
    }
  }

  validateBrazilPhone(): boolean {
    const phoneNumberLength = PhoneConstants.PHONE_NUMBER_LENGTH;
    const prefixLength = PhoneConstants.PREFIX_LENGTH;

    if (this.prefix.length !== prefixLength) {
      throw new Error('Invalid phone prefix');
    }

    if (!/^[0-9]+$/.test(this.prefix)) {
      throw new Error('Invalid phone prefix');
    }

    if (this.number.length !== phoneNumberLength) {
      throw new Error('Invalid phone number');
    }

    if (!/^[0-9]+$/.test(this.number)) {
      throw new Error('Invalid phone number');
    }

    return true;
  }

  toString(): string {
    return `+${this.country_code} (${this.prefix}) ${this.number}`;
  }
}
