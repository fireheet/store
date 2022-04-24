import * as uuid from 'uuid';
import { NAME_MAX_LENGTH, NAME_REGEX } from '@core/owner/config';
import { DOCUMENT_NUMBER_REGEX } from '@core/shared/config';
import { OwnerPropsDataBuilder } from '../OwnerPropsDataBuilder';

describe('#OwnerPropsDataBuilder', () => {
  test('create a valid OwnerProps', () => {
    const { id, name, documentNumber } = OwnerPropsDataBuilder.props().build();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps without id', () => {
    const { id, name, documentNumber } = OwnerPropsDataBuilder.props()
      .withoutID()
      .build();

    expect(id).not.toBeDefined();
    expect(name).toBeDefined();
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps with invalid id', () => {
    const { id, name, documentNumber } = OwnerPropsDataBuilder.props()
      .invalidID()
      .build();

    expect(id).toBeDefined();

    if (id) {
      expect(uuid.validate(id)).toBeFalsy();
    }

    expect(name).toBeDefined();
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps without name', () => {
    const { id, name, documentNumber } = OwnerPropsDataBuilder.props()
      .withoutName()
      .build();

    expect(id).toBeDefined();
    expect(name).not.toBeDefined();
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps with blank name', () => {
    const { id, name, documentNumber } = OwnerPropsDataBuilder.props()
      .blankName()
      .build();

    expect(id).toBeDefined();
    expect(name).toStrictEqual('');
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps with long name', () => {
    const { id, name, documentNumber } = OwnerPropsDataBuilder.props()
      .longName()
      .build();

    expect(id).toBeDefined();
    expect(name.length).toBeGreaterThan(NAME_MAX_LENGTH);
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps with invalid name', () => {
    const { id, name, documentNumber } = OwnerPropsDataBuilder.props()
      .invalidName()
      .build();

    expect(id).toBeDefined();
    expect(NAME_REGEX.test(name)).toBeFalsy();
    expect(documentNumber).toBeDefined();
  });

  test('create a OwnerProps without document number', () => {
    const { id, name, documentNumber } = OwnerPropsDataBuilder.props()
      .withoutDocumentNumber()
      .build();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(documentNumber).not.toBeDefined();
  });

  test('create a OwnerProps with invalid document number', () => {
    const { id, name, documentNumber } = OwnerPropsDataBuilder.props()
      .invalidDocumentNumber()
      .build();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(DOCUMENT_NUMBER_REGEX.test(documentNumber)).toBeFalsy();
  });

  test('create a OwnerProps with blank document number', () => {
    const { id, name, documentNumber } = OwnerPropsDataBuilder.props()
      .blankDocumentNumber()
      .build();

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(documentNumber).toStrictEqual('');
  });
});
