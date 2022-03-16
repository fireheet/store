import { DocumentType } from '@domain/value_objects/types';
import { CreateOwner } from '@domain/usecases/owner';
import { DocumentModel } from '@data/models';
import { OwnerModelMockFactory } from '@data/sources/data/mocks';
import { DocumentAlreadyExistsException } from '@data/contracts/exceptions';
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

describe('Create User Service', () => {
  beforeEach(() => {
    ownersReadRepository = new FakeOwnersReadRepository();
    ownersWriteRepository = new FakeOwnersWriteRepository();
    createOwner = new CreateOwnerService(
      ownersReadRepository,
      ownersWriteRepository
    );
  });

  it('Should not create an Owner with same Document', async () => {
    const document = new DocumentModel({
      number: '12345678901',
      type: DocumentType.CPF
    });

    const ownerData = OwnerModelMockFactory.makeCreateOwnerDTO({ document });

    await createOwner.create(ownerData);

    await expect(createOwner.create(ownerData)).rejects.toBeInstanceOf(
      DocumentAlreadyExistsException
    );
  });
});
