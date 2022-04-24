import * as uuid from 'uuid';
import { NAME_MAX_LENGTH, NAME_REGEX } from '@core/owner/config';
import { DOCUMENT_NUMBER_REGEX } from '@core/shared/config';
import { OwnerPropsObjectMother } from '..';

describe('#OwnerPropsObjectMother', () => {
  test('create a valid OwnerProps', () => {
    const { id, name, documentNumber } = OwnerPropsObjectMother.valid();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps without id', () => {
    const { id, name, documentNumber } = OwnerPropsObjectMother.withoutID();

    expect(id).not.toBeDefined();
    expect(name).toBeDefined();
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps with invalid id', () => {
    const { id, name, documentNumber } = OwnerPropsObjectMother.invalidID();

    expect(id).toBeDefined();

    if (id) {
      expect(uuid.validate(id)).toBeFalsy();
    }

    expect(name).toBeDefined();
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps without name', () => {
    const { id, name, documentNumber } = OwnerPropsObjectMother.withoutName();

    expect(id).toBeDefined();
    expect(name).not.toBeDefined();
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps with blank name', () => {
    const { id, name, documentNumber } = OwnerPropsObjectMother.blankName();

    expect(id).toBeDefined();
    expect(name).toStrictEqual('');
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps with long name', () => {
    const { id, name, documentNumber } = OwnerPropsObjectMother.longName();

    expect(id).toBeDefined();
    expect(name.length).toBeGreaterThan(NAME_MAX_LENGTH);
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps with invalid name', () => {
    const { id, name, documentNumber } = OwnerPropsObjectMother.invalidName();

    expect(id).toBeDefined();
    expect(NAME_REGEX.test(name)).toBeFalsy();
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps without document number', () => {
    const { id, name, documentNumber } =
      OwnerPropsObjectMother.withoutDocumentNumber();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(documentNumber).not.toBeDefined();
  });

  test('create a OwnerProps with invalid document number', () => {
    const { id, name, documentNumber } =
      OwnerPropsObjectMother.invalidDocumentNumber();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(DOCUMENT_NUMBER_REGEX.test(documentNumber)).toBeFalsy();
  });

  test('create a OwnerProps with blank document number', () => {
    const { id, name, documentNumber } =
      OwnerPropsObjectMother.blankDocumentNumber();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(documentNumber).toStrictEqual('');
  });
});
