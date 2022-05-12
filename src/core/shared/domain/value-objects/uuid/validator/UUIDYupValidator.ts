import * as yup from 'yup';
import { Validator } from '@core/shared/domain/contracts';
import { UUID } from '../UUID';

export class UUIDYupValidator implements Validator<UUID> {
  public validate(entity: UUID): void {
    try {
      yup
        .object()
        .shape({
          uuid: yup.string().uuid().required(),
          version: yup.string().oneOf(['v4']).required()
        })
        .validateSync(
          {
            uuid: entity.id,
            version: entity.version
          },
          {
            abortEarly: false
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {
        entity.notification.addError({
          context: 'uuid',
          message: error
        });
      });
    }
  }
}
