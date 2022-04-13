/* eslint-disable import/no-cycle */
import { Document } from '@core/shared/domain/document';
import { Entity } from '@core/shared/domain/entity';
import { ValidationException } from '../../../shared/data/contracts/exceptions/ValidationException';
import { OwnerValidatorFactory } from '../factories';

export class Owner extends Entity {
  name!: string;

  document!: Document;

  constructor(props: Partial<Owner>) {
    super();

    Object.assign(this, props);

    this.validateOwner();

    if (this.validation.hasErrors()) {
      throw new ValidationException(this.validation.messages('owner'));
    }
  }

  private validateOwner() {
    OwnerValidatorFactory.create().validate(this);
  }
}
