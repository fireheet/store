/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  InvalidValidatorException,
  ValidationException
} from '@core/shared/data/contracts';
import { DocumentObjectMother } from '@core/shared/data/sources';
import { DocumentValidatorFactory } from '../factories';
import * as DocumentModule from '../Document';

// eslint-disable-next-line prefer-destructuring
const Document = DocumentModule.Document;

describe('#Document', () => {
  test('instantiate a new Document', () => {
    const { number, type } = DocumentObjectMother.validCPF();

    const document = new Document(
      {
        number,
        type
      },
      DocumentValidatorFactory.create()
    );

    expect(document.number).toStrictEqual('12345678901');
    expect(document.type).toStrictEqual('CPF');
    expect(document.notification).toBeDefined();
  });

  test('instantiate a new Document without validator', () => {
    const constructorSpy = jest.spyOn(DocumentModule, 'Document');

    constructorSpy.mockImplementation(() => {
      throw new InvalidValidatorException('Document Validator is invalid.');
    });

    expect(() => {
      const { number, type } = DocumentObjectMother.validCPF();

      // @ts-ignore
      const document = new Document({ number, type }, undefined);
    }).toThrow(new InvalidValidatorException('Document Validator is invalid.'));

    constructorSpy.mockRestore();
  });

  test('instantiate a new Document without number', () => {
    const { number, type } = DocumentObjectMother.withoutNumber();

    expect(() => {
      // @ts-ignore
      const document = new Document(
        { number, type },
        DocumentValidatorFactory.create()
      );
    }).toThrow(new ValidationException('number is a required field'));
  });

  test('instantiate a new Document without type', () => {
    const { number, type } = DocumentObjectMother.withoutType();

    try {
      // @ts-ignore
      const document = new Document(
        { number, type },
        DocumentValidatorFactory.create()
      );
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationException);
      expect(err).toHaveProperty('message', 'type is a required field');
    }
  });

  test('isDocumentEqual should return true if both documents are equal', () => {
    const firstDocument = DocumentObjectMother.validCPF();
    const secondDocument = DocumentObjectMother.validCPF();

    expect(firstDocument.isDocumentEqual(secondDocument)).toBeTruthy();
  });

  test('isEqualCPF should return true if document number is equal parameter', () => {
    const firstDocument = DocumentObjectMother.validCPF();
    const secondDocument = DocumentObjectMother.validCPF();

    expect(firstDocument.isEqualCPF(secondDocument.getNumber())).toBeTruthy();
  });
});
