import { AddressConstants } from '@constants/domain/value_objects';

export class Address {
  country!: string;

  state!: string;

  city!: string;

  street!: string;

  number!: number;

  neighborhood = '';

  zip_code!: string;

  constructor(data: Partial<Address>) {
    Object.assign(this, data);

    this.validateAddress();
  }

  validateZipCode(): void {
    const zipCodeLength = AddressConstants.ZIP_CODE_LENGTH;

    if (!this.zip_code) {
      throw new Error('Zip code must not be null!');
    }

    if (this.zip_code.length !== zipCodeLength) {
      throw new Error('Invalid zip code');
    }

    if (!/^[0-9]+$/.test(this.zip_code)) {
      throw new Error('Invalid zip code');
    }
  }

  validateAddress(): void {
    if (
      !(this.country && this.state && this.city && this.street && this.number)
    ) {
      throw new Error('Address values must not be null!');
    }

    this.validateZipCode();
    this.checkFieldLenghts();
  }

  checkFieldLenghts(): void {
    const countryMaxLength = AddressConstants.COUNTRY_MAX_LENGTH;
    const stateMaxLength = AddressConstants.STATE_MAX_LENGTH;
    const cityMaxLength = AddressConstants.CITY_MAX_LENGTH;
    const streetMaxLength = AddressConstants.STREET_MAX_LENGTH;
    const numberMaxValue = AddressConstants.NUMBER_MAX_VALUE;
    const numberMinValue = AddressConstants.NUMBER_MIN_VALUE;

    if (this.country.length > countryMaxLength) {
      throw new Error(
        `Country must be less than ${countryMaxLength} characters!`
      );
    }

    if (this.state.length > stateMaxLength) {
      throw new Error(`State must be less than ${stateMaxLength} characters!`);
    }

    if (this.city.length > cityMaxLength) {
      throw new Error(`City must be less than ${cityMaxLength} characters!`);
    }

    if (this.street.length > streetMaxLength) {
      throw new Error(
        `Street must be less than ${streetMaxLength} characters!`
      );
    }

    if (this.number < numberMinValue && this.number > numberMaxValue) {
      throw new Error(
        `Number must be greater than ${numberMinValue}` +
          ` and less than ${numberMaxValue}!`
      );
    }
  }

  public toBrazilString(): string {
    return (
      `${this.country}, ${this.state}, ${this.city}, ${this.street}` +
      ` nº${this.number}, ${this.neighborhood} - CEP: ${this.zip_code}`
    );
  }
}
