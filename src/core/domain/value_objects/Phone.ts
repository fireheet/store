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
    if (this.country_code.length !== 2) {
      throw new Error('Invalid country code');
    }

    if (!/^[0-9]+$/.test(this.country_code)) {
      throw new Error('Invalid country code');
    }
  }

  validatePhoneByCountryCode(): void {
    switch (this.country_code) {
      case '+55':
        this.validateBrazilPhone();
        break;
      default:
        throw new Error('Country code not supported!');
    }
  }

  validateBrazilPhone(): boolean {
    if (this.prefix.length !== 2) {
      throw new Error('Invalid phone prefix');
    }

    if (!/^[0-9]+$/.test(this.prefix)) {
      throw new Error('Invalid phone prefix');
    }

    if (this.number.length <= 8 || this.number.length > 9) {
      throw new Error('Invalid phone number');
    }

    if (!/^[0-9]+$/.test(this.number)) {
      throw new Error('Invalid phone number');
    }

    return true;
  }
}
