import { DocumentValidatorFactory } from '..';
import { DocumentYupValidator } from '../../validator';

describe('#DocumentValidatorFactory', () => {
  test('create a new Document Validator', () => {
    const validator = DocumentValidatorFactory.create();

    expect(validator).toBeDefined();
    expect(validator).toHaveProperty('validate');
    expect(validator).toBeInstanceOf(DocumentYupValidator);
  });
});
