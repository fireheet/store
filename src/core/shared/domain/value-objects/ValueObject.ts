/* eslint-disable no-underscore-dangle */
import { Notification } from '@core/shared/domain/errors';

export abstract class ValueObject {
  notification!: Notification;

  constructor() {
    this.notification = new Notification();
  }
}
