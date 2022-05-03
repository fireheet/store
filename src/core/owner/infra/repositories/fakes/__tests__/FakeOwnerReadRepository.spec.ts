import { FakeOwnerReadRepository } from '@core/owner/infra/repositories';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';
import { DocumentModel } from '@core/shared/data/models';
import {
  DocumentType,
  DocumentValidatorFactory
} from '@core/shared/domain/value-objects';
import { OwnerReadRepository } from '@core/owner/data/contracts';

let ownersReadRepository: OwnerReadRepository;

describe('#FakeOwnerReadRepository', () => {
  beforeEach(() => {
    ownersReadRepository = new FakeOwnerReadRepository();
  });

  it('should be possible to create an Repository Owner', async () => {
    const dto = RepositoryOwnerObjectMother.valid();
    const owner = await ownersReadRepository.create(dto);

    expect(owner).toBeTruthy();
  });

  it('should be possible to replace an Repository Owner', async () => {
    const dto = RepositoryOwnerObjectMother.valid();
    await ownersReadRepository.create(dto);

    const updateModel = RepositoryOwnerObjectMother.valid();
    updateModel.id = dto.id;
    updateModel.name = 'Test 2';

    const updateOwner = await ownersReadRepository.replace(updateModel);

    expect(updateOwner).toBeTruthy();
  });

  it('should return true if Owner is disabled', async () => {
    const disabledOwner = RepositoryOwnerObjectMother.disabled();
    await ownersReadRepository.create(disabledOwner);

    const enabled = await ownersReadRepository.enable({
      id: disabledOwner.id
    });

    expect(enabled).toBeTruthy();
  });

  it('should return true if Owner is already enabled', async () => {
    const owner = RepositoryOwnerObjectMother.valid();
    await ownersReadRepository.create(owner);

    const enabled = await ownersReadRepository.enable({ id: owner.id });

    expect(enabled).toBeTruthy();
  });

  it("should return return false if Owner doesn't exist", async () => {
    const enabled = await ownersReadRepository.enable({ id: '1' });

    expect(enabled).toBeFalsy();
  });

  it('should return true if Owner is enabled', async () => {
    const owner = RepositoryOwnerObjectMother.valid();
    await ownersReadRepository.create(owner);

    const disabled = await ownersReadRepository.disable({ id: owner.id });

    expect(disabled).toBeTruthy();
  });

  it('should return true if Owner is already disabled', async () => {
    const owner = RepositoryOwnerObjectMother.disabled();
    await ownersReadRepository.create(owner);

    const disabled = await ownersReadRepository.disable({ id: owner.id });

    expect(disabled).toBeTruthy();
  });

  it("should return return false if Owner doesn't exist", async () => {
    const disabled = await ownersReadRepository.disable({ id: '1' });

    expect(disabled).toBeFalsy();
  });

  it('should return an Repository Owner if ID exists', async () => {
    const owner = RepositoryOwnerObjectMother.valid();
    await ownersReadRepository.create(owner);

    const foundOwner = await ownersReadRepository.findByID(owner.id);

    expect(foundOwner).toBeTruthy();

    if (!foundOwner) return;

    expect(foundOwner.id).toBe(owner.id);
    expect(foundOwner.name).toBe(owner.name);
    expect(foundOwner.document.toString()).toBe(owner.document.toString());
  });

  it("should return undefined if Repository Owner doesn't exists", async () => {
    const owner = await ownersReadRepository.findByID('1');

    expect(owner).toBeUndefined();
  });

  it('should return an Repository Owner if Document exists', async () => {
    const owner = RepositoryOwnerObjectMother.valid();
    await ownersReadRepository.create(owner);

    const foundOwner = await ownersReadRepository.findByDocument(
      owner.document
    );

    expect(foundOwner).toBeTruthy();

    if (!foundOwner) return;

    expect(foundOwner.id).toBe(owner.id);
    expect(foundOwner.name).toBe(owner.name);
    expect(foundOwner.document.toString()).toBe(owner.document.toString());
  });

  it("should return undefined if Document doesn't exists", async () => {
    const owner = await ownersReadRepository.findByDocument(
      new DocumentModel(
        {
          number: '12345678901',
          type: DocumentType.CPF
        },
        DocumentValidatorFactory.create()
      )
    );

    expect(owner).toBeUndefined();
  });
});
