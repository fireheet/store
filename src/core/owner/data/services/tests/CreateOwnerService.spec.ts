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
import { OwnerConstants } from '@core/owner/config';
import { CreateOwnerService } from '../CreateOwnerService';

let createOwner: CreateOwner;
let ownersReadRepository: FakeOwnerReadRepository;
let ownersWriteRepository: FakeOwnerWriteRepository;

const createOwnerDto = OwnerMockFactory.makeCreateOwnerDTO;

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
    it('should not be possible create an Owner with null values', async () => {
      const owner1 = createOwner.create({
        name: null,
        documentNumber: '12345678901'
      });

      const owner2 = createOwner.create({
        name: 'Test',
        documentNumber: null
      });

      await expect(owner1).rejects.toBeInstanceOf(NullValuesException);

      await expect(owner2).rejects.toBeInstanceOf(NullValuesException);
    });

    it(
      `should not be possible create an Owner with name that has more than ` +
        `${OwnerConstants.NAME_MAX_LENGTH} character`,
      async () => {
        const ownerDto = createOwnerDto({
          name: 'a'.repeat(OwnerConstants.NAME_MAX_LENGTH + 1)
        });

        await expect(createOwner.create(ownerDto)).rejects.toBeInstanceOf(
          InvalidNameException
        );
      }
    );

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
