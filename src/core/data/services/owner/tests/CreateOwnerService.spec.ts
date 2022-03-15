import { DocumentType } from '@domain/value_objects/types';
import { CreateOwner } from '@domain/usecases/owner';
import { DocumentModel } from '@data/models';
import { OwnerModelMockFactory } from '@data/sources/data/mocks';
import { DocumentAlreadyExistsException } from '@data/contracts/exceptions';

let createOwnersService: CreateOwner;

describe('CreateUserService', () => {
  beforeEach(() => {
    // usersReadRepository = new FakeOwnersReadRepository();
    // usersWriteRepository = new FakeOwnersWriteRepository();
    // createOwnersService = new CreateOwnerService(
    //  usersReadRepository,
    //  usersWriteRepository,
    // );
  });

  it('Should not create an Owner with same Document', async () => {
    const document = new DocumentModel({
      number: '12345678901',
      type: DocumentType.CPF,
    });

    const ownerData = OwnerModelMockFactory.makeOwnerModel({ document });

    await createOwnersService.create(ownerData);

    await expect(createOwnersService.create(ownerData)).rejects.toBeInstanceOf(
      DocumentAlreadyExistsException,
    );
  });
});
