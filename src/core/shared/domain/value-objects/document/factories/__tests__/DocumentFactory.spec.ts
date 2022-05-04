import { DocumentObjectMother } from '@core/shared/data/sources';
import { InvalidParameterException } from '../../../../../data/contracts';
import { DocumentFactory } from '../DocumentFactory';

describe('#DocumentFactory', () => {
  test('create a new Document valid CPF document', () => {
    const props = DocumentObjectMother.validCPF();
    const document = DocumentFactory.create(props);

    expect(document).toBeDefined();
    expect(document.type).toBe(props.type);
    expect(document.isEqualCPF(props.number)).toBe(true);
  });

  test('create a new Document valid CNPJ document', () => {
    const props = DocumentObjectMother.validCPNJ();
    const document = DocumentFactory.create(props);

    expect(document).toBeDefined();
    expect(document.type).toBe(props.type);
    expect(document.isEqualCNPJ(props.number)).toBe(true);
  });

  test('create a Document with no number', () => {
    const { number, type } = DocumentObjectMother.withoutNumber();

    expect(() => {
      DocumentFactory.create({ number, type });
    }).toThrow('Parameter document number is invalid!');

    expect(() => {
      DocumentFactory.create({ number, type });
    }).toThrow(new InvalidParameterException('document number'));
  });
});
