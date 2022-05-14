import { Notification } from '@core/shared/domain/errors';

export interface Validator<T> {
  validate(entity: T, notification?: Notification): void;
}
