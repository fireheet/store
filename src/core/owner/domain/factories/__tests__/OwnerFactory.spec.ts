import { OwnerPropsObjectMother } from '../../../data/sources/mocks/object-mother';
import { OwnerFactory } from '../OwnerFactory';

describe('#OwnerFactory', () => {
  test('create a new Owner with valid name', () => {
    const props = OwnerPropsObjectMother.valid();
    const owner = OwnerFactory.create(props);

    expect(owner).toBeDefined();
    expect(owner.name).toBe(props.name);
    expect(owner.document.formatDocumentNumber()).toBe(props.documentNumber);
  });

  test('create a new Owner with no name', () => {
    expect(() => {
      OwnerFactory.create(OwnerPropsObjectMother.withoutName());
    }).toThrow('name is a required field');
  });

  test('create a new Owner with no document number', () => {
    expect(() => {
      OwnerFactory.create(OwnerPropsObjectMother.withoutDocumentNumber());
    }).toThrow('Parameter document number is invalid!');
  });

  test('create a new Owner without existing id', () => {
    const props = OwnerPropsObjectMother.withoutID();
    const owner = OwnerFactory.create(props);

    expect(owner).toBeDefined();
    expect(owner.id).toBeDefined();
    expect(owner.name).toBe(props.name);
    expect(owner.document.formatDocumentNumber()).toBe(props.documentNumber);
  });
});
