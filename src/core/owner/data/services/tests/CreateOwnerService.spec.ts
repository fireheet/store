/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CreateOwner } from '@core/owner/domain/usecases';
import {
  DocumentAlreadyExistsException,
  InvalidDocumentException,
  NullValuesException,
  InvalidNameException
} from '@core/shared/data/contracts';
import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra';
import { OwnerMockFactory } from '@core/owner/data/sources';
import { CreateOwnerService } from '../CreateOwnerService';

let createOwner: CreateOwner;
let ownersReadRepository: FakeOwnerReadRepository;
let ownersWriteRepository: FakeOwnerWriteRepository;

const createOwnerDto = OwnerMockFactory.makeInputCreateOwnerDTO;

describe('CreateOwnerService', () => {
  beforeEach(() => {
    ownersReadRepository = new FakeOwnerReadRepository();
    ownersWriteRepository = new FakeOwnerWriteRepository();
    createOwner = new CreateOwnerService(
      ownersReadRepository,
      ownersWriteRepository
    );
  });

  describe('Success Cases', () => {
    it('should be possible to create an Owner with only name and Document', async () => {
      const dto = createOwnerDto();
      const owner = await createOwner.create(dto);

      const { number } = owner.document.getDocumentValues();

      expect(owner).toBeTruthy();
      expect(owner.name).toBe(dto.name);
      expect(number).toBe(dto.documentNumber);
    });
  });

  describe('Exception Cases', () => {
    it('should not be possible create an Owner with null or undefined values', async () => {
      await expect(
        createOwner.create({
          // @ts-ignore
          name: null,
          documentNumber: '12345678901'
        })
      ).rejects.toBeInstanceOf(NullValuesException);

      await expect(
        createOwner.create({
          // @ts-ignore
          name: undefined,
          documentNumber: '12345678901'
        })
      ).rejects.toBeInstanceOf(NullValuesException);

      await expect(
        createOwner.create({
          name: 'Test',
          // @ts-ignore
          documentNumber: null
        })
      ).rejects.toBeInstanceOf(NullValuesException);

      await expect(
        createOwner.create({
          name: 'Test',
          // @ts-ignore
          documentNumber: undefined
        })
      ).rejects.toBeInstanceOf(NullValuesException);
    });

    it(`should not be possible create an Owner with name that has more than 150 character`, async () => {
      const ownerDto = createOwnerDto({
        name: 'a'.repeat(151)
      });

      await expect(createOwner.create(ownerDto)).rejects.toBeInstanceOf(
        InvalidNameException
      );
    });

    it('should not be possible create an Owner with invalid document number', async () => {
      await expect(
        createOwner.create(createOwnerDto({ documentNumber: '123' }))
      ).rejects.toBeInstanceOf(InvalidDocumentException);
    });

    it('should not be possible to create an Owner with same Document', async () => {
      const ownerData = createOwnerDto({ documentNumber: '12345678901' });

      await createOwner.create(ownerData);

      const failOwner = createOwner.create(ownerData);

      await expect(failOwner).rejects.toBeInstanceOf(
        DocumentAlreadyExistsException
      );
    });
  });
});
