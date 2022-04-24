import {
  InvalidValidatorException,
  ValidationException
} from '@core/shared/data/contracts';
import { OwnerValidatorFactory } from '@core/owner/domain/factories';
import { OwnerYupValidator } from '@core/owner/domain/validator';
import { OwnerObjectMother } from '@core/owner/data/sources';
import { Owner } from '../Owner';

describe('#Owner', () => {
  test('instantiate a new Owner', () => {
    const owner = new Owner(
      OwnerObjectMother.valid(),
      OwnerValidatorFactory.create()
    );

    expect(owner).toBeDefined();
    expect(owner).toBeInstanceOf(Owner);
    expect(owner.notification.hasErrors()).toBeFalsy();
  });

  test('instantiate a new Owner with no validator', () => {
    OwnerValidatorFactory.create = jest.fn().mockReturnValue(undefined);

    expect(() => {
      // eslint-disable-next-line no-new
      new Owner(OwnerObjectMother.valid(), OwnerValidatorFactory.create());
    }).toThrow(InvalidValidatorException);

    // Reset validator factory
    OwnerValidatorFactory.create = () => {
      return new OwnerYupValidator();
    };
  });

  test('instantiate a new Owner without name', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Owner(
        OwnerObjectMother.withoutName(),
        OwnerValidatorFactory.create()
      );
    }).toThrowError(ValidationException);

    expect(() => {
      // eslint-disable-next-line no-new
      new Owner(
        OwnerObjectMother.withoutName(),
        OwnerValidatorFactory.create()
      );
    }).toThrow('name is a required field');
  });

  test('instantiate a new Owner without document', () => {
    const createNewOwner = () => {
      // eslint-disable-next-line no-new
      new Owner(
        OwnerObjectMother.withoutDocument(),
        OwnerValidatorFactory.create()
      );
    };

    expect(createNewOwner).toThrowError(
      'document.number is a required field, document.type is a required field'
    );

    expect(createNewOwner).toThrow(ValidationException);
  });
});
