/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  InvalidValidatorException,
  // InvalidValidatorException,
  ValidationException
} from '@core/shared/data/contracts';
import { OwnerValidatorFactory } from '@core/owner/domain/factories';
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
    try {
      // @ts-ignore
      const owner = new Owner(OwnerObjectMother.withoutName(), undefined);
    } catch (error) {
      expect(error).toHaveProperty('message', 'Owner Validator is invalid.');
      expect(error).toBeInstanceOf(InvalidValidatorException);
    }
  });

  test('instantiate a new Owner without name', () => {
    expect(() => {
      // @ts-ignore
      const owner = new Owner(
        OwnerObjectMother.withoutName(),
        OwnerValidatorFactory.create()
      );
    }).toThrowError(ValidationException);
  });

  test('instantiate a new Owner without document', () => {
    expect(() => {
      // @ts-ignore
      const owner = new Owner(
        OwnerObjectMother.withoutDocument(),
        OwnerValidatorFactory.create()
      );
    }).toThrow(ValidationException);
  });
});
