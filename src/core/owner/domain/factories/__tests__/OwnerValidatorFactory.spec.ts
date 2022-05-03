import { OwnerYupValidator } from '../../validator';
import { OwnerValidatorFactory } from '..';

describe('#OwnerValidatorFactory', () => {
  test('create a new Owner Validator', () => {
    const validator = OwnerValidatorFactory.create();

    expect(validator).toBeDefined();
    expect(validator).toHaveProperty('validate');
    expect(validator).toBeInstanceOf(OwnerYupValidator);
  });
});
