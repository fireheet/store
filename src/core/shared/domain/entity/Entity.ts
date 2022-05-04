/* eslint-disable no-underscore-dangle */
import { Notification } from '@core/shared/domain/errors';

export abstract class Entity {
  protected _id!: string;

  #notification: Notification;

  constructor() {
    this.#notification = new Notification();
  }

  get notification(): Notification {
    return this.#notification;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}
