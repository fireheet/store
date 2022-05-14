/* eslint-disable @typescript-eslint/ban-ts-comment */
import { InvalidValidatorException } from '@core/shared/data/contracts';
import { UUIDObjectMother } from '@core/shared/data/sources';
import * as UUIDModule from '../UUID';
import { UUIDValidatorFactory } from '../factories';

// eslint-disable-next-line prefer-destructuring
const UUID = UUIDModule.UUID;

describe('#UUID', () => {
  test('instantiate a new UUID', () => {
    const { id, version } = UUIDObjectMother.valid();

    const uuid = new UUID(
      {
        id,
        version
      },
      UUIDValidatorFactory.create()
    );

    expect(uuid.id).toStrictEqual(id);
    expect(uuid.version).toStrictEqual('v4');
  });

  test('instantiate a new UUID without validator', () => {
    const constructorSpy = jest.spyOn(UUIDModule, 'UUID');

    constructorSpy.mockImplementation(() => {
      throw new InvalidValidatorException('UUID Validator is invalid.');
    });

    expect(() => {
      const { id, version } = UUIDObjectMother.valid();

      // @ts-ignore
      const uuid = new UUID({ id, version }, undefined);
    }).toThrow(new InvalidValidatorException('UUID Validator is invalid.'));

    constructorSpy.mockRestore();
  });
});
