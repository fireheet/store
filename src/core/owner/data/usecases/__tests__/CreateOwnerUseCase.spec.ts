import { CreateOwner } from '@core/owner/domain/usecases';
import {
  DocumentAlreadyExistsException,
  InvalidParameterException,
  ValidationException
} from '@core/shared/data/contracts';
import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import {
  OwnerPropsObjectMother,
  RepositoryOwnerObjectMother
} from '@core/owner/data/sources';
import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts';
import { CreateOwnerUseCase } from '..';

let createOwner: CreateOwner;
let fakeOwnersReadRepository: OwnerReadRepository;
let fakeOwnersWriteRepository: OwnerWriteRepository;

describe('#CreateOwnerUseCase', () => {
  beforeEach(() => {
    fakeOwnersReadRepository = new FakeOwnerReadRepository();
    fakeOwnersWriteRepository = new FakeOwnerWriteRepository();
    createOwner = new CreateOwnerUseCase(
      fakeOwnersReadRepository,
      fakeOwnersWriteRepository
    );
  });

  it('should be possible to create an Owner with only name and Document', async () => {
    const props = OwnerPropsObjectMother.valid();
    const owner = await createOwner.create(props);

    const { number } = owner.document.getDocument();

    expect(owner).toBeTruthy();
    expect(owner.name).toBe(props.name);
    expect(number).toBe(props.documentNumber);
  });

  it('should not be possible create an Owner with invalid Name', async () => {
    const blankName = createOwner.create(OwnerPropsObjectMother.blankName());

    await expect(blankName).rejects.toBeInstanceOf(ValidationException);
    await expect(blankName).rejects.toHaveProperty(
      'message',
      'name has invalid characters, name is a required field'
    );

    const invalidName = createOwner.create(
      OwnerPropsObjectMother.invalidName()
    );

    await expect(invalidName).rejects.toBeInstanceOf(ValidationException);
    await expect(invalidName).rejects.toHaveProperty(
      'message',
      'name has invalid characters'
    );
  });

  it('should not be possible create an Owner with invalid Document number', async () => {
    const blankDocumentNumber = createOwner.create(
      OwnerPropsObjectMother.blankDocumentNumber()
    );

    await expect(blankDocumentNumber).rejects.toBeInstanceOf(
      InvalidParameterException
    );
    await expect(blankDocumentNumber).rejects.toHaveProperty(
      'message',
      'Parameter document number is invalid!'
    );

    const invalidDocumentNumber = createOwner.create(
      OwnerPropsObjectMother.invalidDocumentNumber()
    );

    await expect(invalidDocumentNumber).rejects.toBeInstanceOf(
      ValidationException
    );
    await expect(invalidDocumentNumber).rejects.toHaveProperty(
      'message',
      'document number has invalid characters'
    );
  });

  it(`should not be possible create an Owner with name that has more than 150 character`, async () => {
    await expect(
      createOwner.create(OwnerPropsObjectMother.longName())
    ).rejects.toBeInstanceOf(ValidationException);
  });

  it('should not be possible to create an Owner with same Document', () => {
    const owner = RepositoryOwnerObjectMother.valid();
    fakeOwnersWriteRepository
      .create(owner)
      .then(() => {
        fakeOwnersReadRepository
          .create(owner)
          .then(() => {
            createOwner
              .create({
                name: 'John Doe',
                documentNumber: owner.document.number
              })
              .then()
              .catch(error => {
                expect(error).toBeInstanceOf(DocumentAlreadyExistsException);
                expect(error).toHaveProperty(
                  'message',
                  'Document already exists!'
                );
              });
          })
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .catch(() => {});
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  });
});
