/* eslint-disable no-underscore-dangle */
import { Notification } from '@core/shared/domain/errors';
import { UUID } from '../value-objects/uuid/UUID';

export abstract class Entity {
  protected _id!: UUID;

  #notification: Notification;

  constructor() {
    this.#notification = new Notification();
  }

  get notification(): Notification {
    return this.#notification;
  }

  get id(): UUID {
    return this._id;
  }

  set id(id: UUID) {
    this._id = id;
  }
}
