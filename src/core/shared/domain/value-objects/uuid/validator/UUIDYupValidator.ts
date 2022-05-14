import * as yup from 'yup';
import { Validator } from '@core/shared/domain/contracts';
import { Notification } from '@core/shared/domain/errors';
import { UUID } from '../UUID';

export class UUIDYupValidator implements Validator<UUID> {
  /**
   * @param object UUID string to validate
   * @param notification Notification object from parent entity
   */
  public validate(object: UUID, notification: Notification): void {
    try {
      yup
        .object()
        .shape({
          uuid: yup.string().uuid().required(),
          version: yup.string().oneOf(['v4']).required()
        })
        .validateSync(
          {
            uuid: object.id,
            version: object.version
          },
          {
            abortEarly: false
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {
        notification.addError({
          context: 'uuid',
          message: error
        });
      });
    }
  }
}
