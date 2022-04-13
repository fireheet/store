/* eslint-disable no-underscore-dangle */
import { Validation } from '@core/shared/data/sources';

export abstract class ValueObject {
  validation!: Validation;

  constructor() {
    this.validation = new Validation();
  }
}
