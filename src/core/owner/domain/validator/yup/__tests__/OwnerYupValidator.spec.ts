import { OwnerObjectMother } from '@core/owner/data/sources';
import { OwnerYupValidator } from '..';

let ownerValidator: OwnerYupValidator;

describe('#OwnerYupValidator', () => {
  beforeEach(() => {
    ownerValidator = new OwnerYupValidator();
  });

  test('validate valid Owner', () => {
    const owner = OwnerObjectMother.valid();

    ownerValidator.validate(owner);

    expect(owner.notification.hasErrors()).toBeFalsy();
  });

  test('validate Owner with no id', () => {
    const owner = OwnerObjectMother.withoutID();

    ownerValidator.validate(owner);

    expect(owner.notification.hasErrors()).toBeTruthy();
    expect(owner.notification.messages('owner')).toStrictEqual(
      'id is a required field'
    );
  });

  test('validate Owner with invalid id', () => {
    const owner = OwnerObjectMother.invalidID();

    ownerValidator.validate(owner);

    expect(owner.notification.hasErrors()).toBeTruthy();
    expect(owner.notification.messages('owner')).toStrictEqual(
      'id is not valid'
    );
  });

  test('validate Owner with no name', () => {
    const owner = OwnerObjectMother.withoutName();

    ownerValidator.validate(owner);

    expect(owner.notification.hasErrors()).toBeTruthy();
    expect(owner.notification.messages('owner')).toStrictEqual(
      'name is a required field'
    );
  });

  test('validate Owner with long name', () => {
    const owner = OwnerObjectMother.longName();

    ownerValidator.validate(owner);

    expect(owner.notification.hasErrors()).toBeTruthy();
    expect(owner.notification.messages('owner')).toStrictEqual(
      'name must be at most 150 characters'
    );
  });

  test('validate Owner with invalid name', () => {
    const owner = OwnerObjectMother.invalidName();

    ownerValidator.validate(owner);

    expect(owner.notification.hasErrors()).toBeTruthy();
    expect(owner.notification.messages('owner')).toStrictEqual(
      'name has invalid characters'
    );
  });

  test('validate Owner with no document', () => {
    const owner = OwnerObjectMother.withoutDocument();

    ownerValidator.validate(owner);

    expect(owner.notification.hasErrors()).toBeTruthy();
    expect(owner.notification.messages('owner')).toStrictEqual(
      'document.number is a required field, document.type is a required field'
    );
  });

  test('validate Owner with invalid document number', () => {
    const owner = OwnerObjectMother.invalidDocumentNumber();

    ownerValidator.validate(owner);

    expect(owner.notification.hasErrors()).toBeTruthy();
    expect(owner.notification.messages('owner')).toStrictEqual(
      'document.number is invalid'
    );
  });

  test('validate Owner with document number length exceeded', () => {
    const owner = OwnerObjectMother.longDocumentNumber();

    ownerValidator.validate(owner);

    expect(owner.notification.hasErrors()).toBeTruthy();
    expect(owner.notification.messages('owner')).toStrictEqual(
      'document.number must be exactly 11 characters'
    );
  });

  test('validate Owner with invalid document type', () => {
    const owner = OwnerObjectMother.invalidDocumentType();

    ownerValidator.validate(owner);

    expect(owner.notification.hasErrors()).toBeTruthy();
    expect(owner.notification.messages('owner')).toStrictEqual(
      'document.type must be CPF'
    );
  });
});
