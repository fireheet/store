export class Address {
  country!: string;

  state!: string;

  city!: string;

  street!: string;

  number!: number;

  neighborhood!: string;

  zip_code!: string;

  constructor(data: Partial<Address>) {
    Object.assign(this, data);

    this.validateZipCode();
    this.validateAddress();
  }

  validateZipCode(): void {
    if (this.zip_code.length !== 8) {
      throw new Error('Invalid zip code');
    }

    if (!/^[0-9]+$/.test(this.zip_code)) {
      throw new Error('Invalid zip code');
    }
  }

  validateAddress(): void {
    if (
      !(
        this.country &&
        this.state &&
        this.city &&
        this.street &&
        this.number &&
        this.neighborhood &&
        this.zip_code
      )
    ) {
      throw new Error('Address values must not be null!');
    }

    if (this.country.length > 150) {
      throw new Error('Country must be less than 150 characters!');
    }

    if (this.state.length > 150) {
      throw new Error('State must be less than 150 characters!');
    }

    if (this.city.length > 150) {
      throw new Error('City must be less than 150 characters!');
    }

    if (this.street.length > 150) {
      throw new Error('Street must be less than 150 characters!');
    }

    if (this.neighborhood.length > 150) {
      throw new Error('Neighborhood must be less than 150 characters!');
    }

    if (this.number < 0) {
      throw new Error('Number must be greater than 0!');
    }
  }

  toBrazilString(): string {
    return (
      `${this.country}, ${this.state}, ${this.city}, ${this.street}` +
      ` nº${this.number}, ${this.neighborhood} - CEP: ${this.zip_code}`
    );
  }
}
