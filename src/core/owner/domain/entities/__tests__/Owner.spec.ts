/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  InvalidValidatorException,
  ValidationException
} from '@core/shared/data/contracts';
import { OwnerValidatorFactory } from '@core/owner/domain/factories';
import { OwnerObjectMother } from '@core/owner/data/sources';

import * as OwnerModule from '../Owner';

// eslint-disable-next-line prefer-destructuring
const Owner = OwnerModule.Owner;

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
    const constructorSpy = jest.spyOn(OwnerModule, 'Owner');

    constructorSpy.mockImplementation(() => {
      throw new InvalidValidatorException('Owner Validator is invalid.');
    });

    expect(() => {
      // @ts-ignore
      const owner = new Owner(OwnerObjectMother.withoutName(), undefined);
    }).toThrow(new InvalidValidatorException('Owner Validator is invalid.'));

    constructorSpy.mockRestore();
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
