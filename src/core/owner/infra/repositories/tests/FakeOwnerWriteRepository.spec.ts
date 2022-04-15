import { FakeOwnerWriteRepository } from '@core/owner/infra/repositories';
import { RepositoryOwnerModelMockFactory } from '@core/owner/data/sources';

let ownersWriteRepository: FakeOwnerWriteRepository;

describe('FakeOwnerWriteRepository', () => {
  beforeEach(() => {
    ownersWriteRepository = new FakeOwnerWriteRepository();
  });

  it('should be possible to create an Repository Owner', async () => {
    const mock = RepositoryOwnerModelMockFactory();

    const owner = await ownersWriteRepository.create(mock);
    const storedOwner = ownersWriteRepository.owners[0];

    expect(owner).toBeTruthy();
    expect(ownersWriteRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.name).toBe(mock.name);
    expect(storedOwner.document.toString()).toBe(mock.document.toString());
  });

  it('should be possible to update an Repository Owner', async () => {
    const repositoryOwner = await ownersWriteRepository.create(
      RepositoryOwnerModelMockFactory()
    );

    const updateModel = RepositoryOwnerModelMockFactory({ name: 'New' });

    const updateOwner = await ownersWriteRepository.update(updateModel);
    const storedOwner = ownersWriteRepository.owners[0];

    expect(updateOwner).toBeTruthy();
    expect(ownersWriteRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.id).toBe(updateModel.id);
    expect(storedOwner.name).toBe(updateModel.name);
    expect(storedOwner.name).not.toBe(repositoryOwner.name);
  });

  it('should be possible to enable an Repository Owner', async () => {
    const mock = RepositoryOwnerModelMockFactory();

    const owner = await ownersWriteRepository.create(mock);

    const enableOwner = await ownersWriteRepository.enable({ id: owner.id });
    const storedOwner = ownersWriteRepository.owners[0];

    expect(enableOwner).toBeTruthy();
    expect(ownersWriteRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.id).toBe(owner.id);
  });

  it('should be possible to disable an Repository Owner', async () => {
    const mock = RepositoryOwnerModelMockFactory();

    const owner = await ownersWriteRepository.create(mock);

    const disableOwner = await ownersWriteRepository.disable({
      id: owner.id
    });

    const storedOwner = ownersWriteRepository.owners[0];

    expect(disableOwner).toBeTruthy();
    expect(ownersWriteRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.id).toBe(owner.id);
    expect(storedOwner.deleted_at).toBeDefined();
  });

  // TODO Write exception cases
});
