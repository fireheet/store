import { NAME_MAX_LENGTH, NAME_REGEX } from '@core/owner/config';
import * as uuid from 'uuid';
import { DOCUMENT_NUMBER_REGEX } from '@core/shared/config';
import { DocumentType } from '@core/shared/domain/value_objects';
import { OwnerObjectMother } from '../OwnerObjectMother';

describe('#OwnerObjectMother', () => {
  test('create a valid Owner', () => {
    const { id, name, document, notification } = OwnerObjectMother.valid();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(document).toBeDefined();
    expect(notification).toBeDefined();
  });

  test('create a Owner without name', () => {
    const { id, name, document, notification } =
      OwnerObjectMother.withoutName();

    expect(id).toBeDefined();
    expect(name).not.toBeDefined();
    expect(document).toBeDefined();
    expect(notification).toBeDefined();
  });

  test('create a Owner with invalid name', () => {
    const { id, name, document, notification } =
      OwnerObjectMother.invalidName();

    expect(id).toBeDefined();
    expect(NAME_REGEX.test(name)).toBeFalsy();
    expect(document).toBeDefined();
    expect(notification).toBeDefined();
  });

  test('create a Owner without document', () => {
    const { id, name, document, notification } =
      OwnerObjectMother.withoutDocument();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(document).not.toBeDefined();
    expect(notification).toBeDefined();
  });

  test('create a Owner without id', () => {
    const { id, name, document, notification } = OwnerObjectMother.withoutID();

    expect(id).not.toBeDefined();
    expect(name).toBeDefined();
    expect(document).toBeDefined();
    expect(notification).toBeDefined();
  });

  test('create a Owner with invalid id', () => {
    const { id, name, document, notification } = OwnerObjectMother.invalidID();

    expect(uuid.validate(id)).toBeFalsy();
    expect(name).toBeDefined();
    expect(document).toBeDefined();
    expect(notification).toBeDefined();
  });

  test('create a Owner with long name', () => {
    const { id, name, document, notification } = OwnerObjectMother.longName();

    expect(id).toBeDefined();
    expect(name.length).toBeGreaterThanOrEqual(NAME_MAX_LENGTH);
    expect(document).toBeDefined();
    expect(notification).toBeDefined();
  });

  test('create a Owner with invalid document number', () => {
    const { id, name, document, notification } =
      OwnerObjectMother.invalidDocumentNumber();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(DOCUMENT_NUMBER_REGEX.test(document.number)).toBeFalsy();
    expect(document.number.length).toStrictEqual(11);
    expect(notification).toBeDefined();
  });

  test('create a Owner with long document number', () => {
    const { id, name, document, notification } =
      OwnerObjectMother.longDocumentNumber();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(DOCUMENT_NUMBER_REGEX.test(document.number)).toBeTruthy();
    expect(document.number.length).toStrictEqual(12);
    expect(notification).toBeDefined();
  });

  test('create a Owner with invalid document type', () => {
    const { id, name, document, notification } =
      OwnerObjectMother.invalidDocumentType();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(DOCUMENT_NUMBER_REGEX.test(document.number)).toBeTruthy();
    expect(document.number.length).toStrictEqual(11);
    expect(document.type).toStrictEqual(DocumentType.CNPJ);
    expect(notification).toBeDefined();
  });
});
