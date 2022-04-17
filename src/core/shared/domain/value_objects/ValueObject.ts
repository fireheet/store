/* eslint-disable no-underscore-dangle */
import { Notification } from '@core/shared/domain/errors';

export abstract class ValueObject {
  validation!: Notification;

  constructor() {
    this.validation = new Notification();
  }
}
