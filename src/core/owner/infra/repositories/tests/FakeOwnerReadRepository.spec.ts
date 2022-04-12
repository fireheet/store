import { FakeOwnerReadRepository } from '@core/owner/infra';
import { RepositoryOwnerModelMock } from '../../../data/sources/mocks/RepositoryOwnerModelMock';

let ownersReadRepository: FakeOwnerReadRepository;

describe('FakeOwnerReadRepository', () => {
  beforeEach(() => {
    ownersReadRepository = new FakeOwnerReadRepository();
  });

  it('should be possible to create an Repository Owner', async () => {
    const mock = RepositoryOwnerModelMock();
    const owner = await ownersReadRepository.create(mock);
    const storedOwner = ownersReadRepository.owners[0];

    expect(owner).toBeTruthy();
    expect(ownersReadRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.id).toBe(mock.id);
    expect(storedOwner.name).toBe(mock.name);
    expect(storedOwner.document.toString()).toBe(mock.document.toString());
  });

  it('should be possible to replace an Repository Owner', async () => {
    const updateModel = RepositoryOwnerModelMock();
    updateModel.name = 'Test 2';

    await ownersReadRepository.create(RepositoryOwnerModelMock());

    const updateOwner = await ownersReadRepository.replace(updateModel);
    const storedOwner = ownersReadRepository.owners[0];

    expect(updateOwner).toBeTruthy();
    expect(ownersReadRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.id).toBe(updateModel.id);
    expect(storedOwner.name).toBe(updateModel.name);
    expect(storedOwner.name).not.toBe(RepositoryOwnerModelMock.name);
  });

  it('should be possible to find an Owner by ID', async () => {
    const mock = RepositoryOwnerModelMock();
    await ownersReadRepository.create(RepositoryOwnerModelMock());

    const owner = await ownersReadRepository.findByID('1');

    expect(owner).toBeTruthy();
    expect(owner.id).toBe(mock.id);
    expect(owner.name).toBe(mock.name);
    expect(owner.document.toString()).toBe(mock.document.toString());
  });

  it('should be possible to find an Owner by Document', async () => {
    const mock = RepositoryOwnerModelMock();

    await ownersReadRepository.create(mock);

    const owner = await ownersReadRepository.findByDocument(mock.document);

    expect(owner).toBeTruthy();
    expect(owner.id).toBe(mock.id);
    expect(owner.name).toBe(mock.name);
    expect(owner.document.toString()).toBe(mock.document.toString());
  });

  // TODO Write exception cases
});
