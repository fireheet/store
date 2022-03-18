import { CreateOwner } from '@domain/usecases/owner';
import { DocumentModel } from '@data/models';
import { OwnerModelMockFactory } from '@data/sources/data/mocks';
import {
  DocumentAlreadyExistsException,
  InvalidDocumentException
} from '@data/contracts/exceptions';
import {
  OwnersReadRepository,
  OwnersWriteRepository
} from '@data/contracts/repositories';
import {
  FakeOwnersReadRepository,
  FakeOwnersWriteRepository
} from '@infra/repositories';
import { DocumentType } from '@domain/value_objects/types';
import { CreateOwnerService } from '../CreateOwnerService';

let createOwner: CreateOwner;
let ownersReadRepository: OwnersReadRepository;
let ownersWriteRepository: OwnersWriteRepository;

let document: DocumentModel;

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
    // Test
    const owner = await createOwner.create({
      name: 'Teste',
      documentNumber: '12345678901',
      documentType: 'CPF'
    });

    expect(owner).toBeTruthy();
    expect(owner.name).toBe('Teste');
    expect(owner.document.getDocumentValues().number).toBe('12345678901');
    expect(owner.document.getDocumentValues().type).toBe(DocumentType.CPF);
  });

  it('should not be possible create an Owner with invalid Document', async () => {
    await expect(
      createOwner.create({
        name: 'Teste',
        documentNumber: '123',
        documentType: 'CPF'
      })
    ).rejects.toBeInstanceOf(InvalidDocumentException);
  });

  it('should not be possible to create an Owner with same Document', async () => {
    const ownerData = OwnerModelMockFactory.makeCreateOwnerDTO({ document });

    await createOwner.create(ownerData);

    const failOwner = createOwner.create(ownerData);

    await expect(failOwner).rejects.toBeInstanceOf(
      DocumentAlreadyExistsException
    );
  });

  // it('should be possible to assign an Owner to an existing Store', async () => {});

  // it('should not be possible to assign an Owner to an non-existing Store', async () => {});

  // it('should not be possible to assign an Owner to an Store if it already has one assigned', async () => {});

  // it('should be possible to disable an Owner', async () => {});

  // it('should be not possible to disable an Owner with an Assigned Store', async () => {});

  // it('should be possible to enable an Owner with an Assigned Store', async () => {});

  // it('should be not possible to enable an Owner without an Assigned Store', async () => {});
});
