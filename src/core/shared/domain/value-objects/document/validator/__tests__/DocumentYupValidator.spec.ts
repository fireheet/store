import { DocumentObjectMother } from '@core/shared/data/sources';
import { DocumentYupValidator } from '..';

const documentValidator: DocumentYupValidator = new DocumentYupValidator();

describe('#DocumentYupValidator', () => {
  test('validate valid CPF Document', () => {
    const document = DocumentObjectMother.validCPF();

    documentValidator.validate(document);

    expect(document.notification.hasErrors()).toBeFalsy();
  });

  test('validate valid CNPJ Document', () => {
    const document = DocumentObjectMother.validCPNJ();

    documentValidator.validate(document);

    expect(document.notification.hasErrors()).toBeFalsy();
  });

  test('validate Document without number', () => {
    const document = DocumentObjectMother.withoutNumber();

    documentValidator.validate(document);

    expect(document.notification.hasErrors()).toBeTruthy();
    expect(document.notification.messages('document')).toStrictEqual(
      'number is a required field'
    );
  });

  test('validate Document with wrong number length', () => {
    const longNumber = DocumentObjectMother.longNumber();

    documentValidator.validate(longNumber);

    expect(longNumber.notification.hasErrors()).toBeTruthy();
    expect(longNumber.notification.messages('document')).toStrictEqual(
      'number must be at most 14 characters'
    );

    const shortNumber = DocumentObjectMother.shortNumber();

    documentValidator.validate(shortNumber);

    expect(shortNumber.notification.hasErrors()).toBeTruthy();
    expect(shortNumber.notification.messages('document')).toStrictEqual(
      'number must be at least 11 characters'
    );
  });

  test('validate Document with invalid characters', () => {
    const document = DocumentObjectMother.invalidCharacters();

    documentValidator.validate(document);

    expect(document.notification.hasErrors()).toBeTruthy();
    expect(document.notification.messages('document')).toStrictEqual(
      'document number has invalid characters'
    );
  });

  test('validate Document without type', () => {
    const document = DocumentObjectMother.withoutType();

    documentValidator.validate(document);

    expect(document.notification.hasErrors()).toBeTruthy();
    expect(document.notification.messages('document')).toStrictEqual(
      'type is a required field'
    );
  });

  test('validate Document with invalid type', () => {
    const document = DocumentObjectMother.invalidType();

    documentValidator.validate(document);

    expect(document.notification.hasErrors()).toBeTruthy();
    expect(document.notification.messages('document')).toStrictEqual(
      'type must be one of the following values: CPF, CNPJ'
    );
  });
});
