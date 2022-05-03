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
    const { notification, ...ownerData } = OwnerObjectMother.valid();

    const owner = new Owner(ownerData, OwnerValidatorFactory.create());

    expect(owner).toBeDefined();
    expect(owner).toBeInstanceOf(Owner);
    expect(owner.notification.hasErrors()).toBeFalsy();
  });

  test('instantiate a new Owner without validator', () => {
    const constructorSpy = jest.spyOn(OwnerModule, 'Owner');

    constructorSpy.mockImplementation(() => {
      throw new InvalidValidatorException('Owner Validator is invalid.');
    });

    expect(() => {
      const { notification, ...ownerData } = OwnerObjectMother.valid();

      // @ts-ignore
      const owner = new Owner(ownerData, undefined);
    }).toThrow(new InvalidValidatorException('Owner Validator is invalid.'));

    constructorSpy.mockRestore();
  });

  test('instantiate a new Owner without name', () => {
    const { notification, ...ownerData } = OwnerObjectMother.withoutName();

    expect(() => {
      // @ts-ignore
      const owner = new Owner(ownerData, OwnerValidatorFactory.create());
    }).toThrowError(ValidationException);
  });

  test('instantiate a new Owner without document', () => {
    const { notification, ...ownerData } = OwnerObjectMother.withoutDocument();

    expect(() => {
      // @ts-ignore
      const owner = new Owner(ownerData, OwnerValidatorFactory.create());
    }).toThrow(ValidationException);
  });
});
