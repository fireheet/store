/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CreateOwner } from '@core/owner/domain/usecases';
import {
  DocumentAlreadyExistsException,
  ValidationException
} from '@core/shared/data/contracts';
import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import { CreateOwnerService } from '../CreateOwnerService';

let createOwner: CreateOwner;
let ownersReadRepository: FakeOwnerReadRepository;
let ownersWriteRepository: FakeOwnerWriteRepository;

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
      const owner = await createOwner.create({
        name: 'John Doe',
        documentNumber: '12345678901'
      });

      const { number } = owner.document.getDocumentValues();

      expect(owner).toBeTruthy();
      expect(owner.name).toBe('John Doe');
      expect(number).toBe('12345678901');
    });
  });

  describe('Exception Cases', () => {
    it('should not be possible create an Owner undefined values', async () => {
      const invalidName = createOwner.create({
        name: '',
        documentNumber: '12345678901'
      });

      await expect(invalidName).rejects.toBeInstanceOf(ValidationException);
      await expect(invalidName).rejects.toHaveProperty(
        'message',
        'name is a required field'
      );

      const invalidDocumentNumber = createOwner.create({
        name: 'John',
        documentNumber: ''
      });

      await expect(invalidDocumentNumber).rejects.toBeInstanceOf(
        ValidationException
      );
      await expect(invalidDocumentNumber).rejects.toHaveProperty(
        'message',
        'number must be at least 11 characters, number is a required field'
      );
    });

    it(`should not be possible create an Owner with name that has more than 150 character`, async () => {
      await expect(
        createOwner.create({
          name: 'a'.repeat(151),
          documentNumber: '12345678901'
        })
      ).rejects.toBeInstanceOf(ValidationException);
    });

    it('should not be possible create an Owner with invalid document number', async () => {
      await expect(
        createOwner.create({ name: 'John Doe', documentNumber: '123' })
      ).rejects.toHaveProperty(
        'message',
        'number must be at least 11 characters'
      );

      await expect(
        createOwner.create({ name: 'John Doe', documentNumber: '123456789012' })
      ).rejects.toHaveProperty(
        'message',
        'document.number must be exactly 11 characters'
      );

      await expect(
        createOwner.create({ name: 'John Doe', documentNumber: 'abcdefghijk' })
      ).rejects.toHaveProperty(
        'message',
        'number must match the following: "/^[0-9]*$/"'
      );
    });

    it('should not be possible to create an Owner with same Document', async () => {
      await createOwner.create({ name: 'John', documentNumber: '12345678901' });

      const failOwner = createOwner.create({
        name: 'John',
        documentNumber: '12345678901'
      });

      await expect(failOwner).rejects.toBeInstanceOf(
        DocumentAlreadyExistsException
      );
    });
  });
});
