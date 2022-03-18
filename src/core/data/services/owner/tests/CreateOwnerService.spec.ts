import { CreateOwner } from '@domain/usecases/owner';
import { OwnerMockFactory } from '@data/sources/data/mocks';
import {
  DocumentAlreadyExistsException,
  InvalidDocumentException,
  NullValuesException,
  InvalidNameException
} from '@data/contracts/exceptions';
import {
  OwnersReadRepository,
  OwnersWriteRepository
} from '@data/contracts/repositories';
import {
  FakeOwnersReadRepository,
  FakeOwnersWriteRepository
} from '@infra/repositories';
import { CreateOwnerService } from '../CreateOwnerService';

let createOwner: CreateOwner;
let ownersReadRepository: OwnersReadRepository;
let ownersWriteRepository: OwnersWriteRepository;

const createOwnerDto = OwnerMockFactory.makeCreateOwnerDTO;

describe('CreateOwnerService', () => {
  beforeEach(() => {
    ownersReadRepository = new FakeOwnersReadRepository();
    ownersWriteRepository = new FakeOwnersWriteRepository();
    createOwner = new CreateOwnerService(
      ownersReadRepository,
      ownersWriteRepository
    );
  });

  it('should be possible to create an Owner with only name and Document', async () => {
    const dto = createOwnerDto();
    const owner = await createOwner.create(dto);

    const { number, type } = owner.document.getDocumentValues();

    expect(owner).toBeTruthy();
    expect(owner.name).toBe(dto.name);
    expect(number).toBe(dto.documentNumber);
    expect(type).toBe(dto.documentType);
  });

  it('should not be possible create an Owner with null values', async () => {
    const owner1 = createOwner.create({
      name: null,
      documentNumber: '12345678901',
      documentType: 'CPF'
    });

    const owner2 = createOwner.create({
      name: 'Test',
      documentNumber: null,
      documentType: null
    });

    await expect(owner1).rejects.toBeInstanceOf(NullValuesException);

    await expect(owner2).rejects.toBeInstanceOf(NullValuesException);
  });

  it('should not be possible create an Owner with name that has more than 150 character', async () => {
    const ownerDto = createOwnerDto({ name: 'a'.repeat(151) });

    await expect(createOwner.create(ownerDto)).rejects.toBeInstanceOf(
      InvalidNameException
    );
  });

  it('should not be possible create an Owner with invalid document number', async () => {
    await expect(
      createOwner.create(createOwnerDto({ documentNumber: '123' }))
    ).rejects.toBeInstanceOf(InvalidDocumentException);
  });

  it('should not be possible create an Owner with invalid document type', async () => {
    await expect(
      createOwner.create(createOwnerDto({ documentType: 'invalid' }))
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
