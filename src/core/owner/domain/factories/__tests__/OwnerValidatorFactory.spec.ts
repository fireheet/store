import { OwnerYupValidator } from '../../validator';
import { OwnerValidatorFactory } from '../OwnerValidatorFactory';

describe('#OwnerFactory', () => {
  test('create a new Owner Validator', () => {
    const validator = OwnerValidatorFactory.create();

    expect(validator).toBeDefined();
    expect(validator).toBeInstanceOf(OwnerYupValidator);
  });
});
