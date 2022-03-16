import { DocumentType } from '@domain/value_objects/types';
import { CreateOwner } from '@domain/usecases/owner';
import { DocumentModel } from '@data/models';
import { OwnerModelMockFactory } from '@data/sources/data/mocks';
import { DocumentAlreadyExistsException } from '@data/contracts/exceptions';

let createOwner: CreateOwner;

describe('CreateUserService', () => {
  beforeEach(() => {
    // TODO Instantiate CreateOwnersService
  });

  it('Should not create an Owner with same Document', async () => {
    const document = new DocumentModel({
      number: '12345678901',
      type: DocumentType.CPF
    });

    const ownerData = OwnerModelMockFactory.makeOwnerModel({ document });

    await createOwner.create(ownerData);

    await expect(createOwner.create(ownerData)).rejects.toBeInstanceOf(
      DocumentAlreadyExistsException
    );
  });
});
