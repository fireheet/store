import { FakeOwnerReadRepository } from '@core/owner/infra';
import { OwnerMockFactory } from '@core/owner/data';

let ownersReadRepository: FakeOwnerReadRepository;

const repositoryOwnerModelFactory = OwnerMockFactory.makeRepositoryOwnerDTO;

describe('FakeOwnerReadRepository', () => {
  beforeEach(() => {
    ownersReadRepository = new FakeOwnerReadRepository();
  });

  it('should be possible to create an Repository Owner', async () => {
    const model = repositoryOwnerModelFactory();

    const owner = await ownersReadRepository.create(model);
    const storedOwner = ownersReadRepository.owners[0];

    expect(owner).toBeTruthy();
    expect(ownersReadRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.id).toBe(model.id);
    expect(storedOwner.name).toBe(model.name);
    expect(storedOwner.document.toString()).toBe(model.document.toString());
    expect(storedOwner.isEnabled).toBe(true);
  });

  it('should be possible to replace an Repository Owner', async () => {
    const model = repositoryOwnerModelFactory({ name: 'John' });
    const updateModel = repositoryOwnerModelFactory({
      ...model,
      name: 'New'
    });

    await ownersReadRepository.create(model);

    const updateOwner = await ownersReadRepository.replace(updateModel);
    const storedOwner = ownersReadRepository.owners[0];

    expect(updateOwner).toBeTruthy();
    expect(ownersReadRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.id).toBe(updateModel.id);
    expect(storedOwner.name).toBe(updateModel.name);
    expect(storedOwner.name).not.toBe(model.name);
  });

  it('should be possible to find an Owner by ID', async () => {
    const model = repositoryOwnerModelFactory();

    await ownersReadRepository.create(model);

    const owner = await ownersReadRepository.findByID(model.id);

    expect(owner).toBeTruthy();
    expect(owner.id).toBe(model.id);
    expect(owner.name).toBe(model.name);
    expect(owner.document.toString()).toBe(model.document.toString());
  });

  it('should be possible to find an Owner by Document', async () => {
    const model = repositoryOwnerModelFactory();

    await ownersReadRepository.create(model);

    const owner = await ownersReadRepository.findByDocument(model.document);

    expect(owner).toBeTruthy();
    expect(owner.id).toBe(model.id);
    expect(owner.name).toBe(model.name);
    expect(owner.document.toString()).toBe(model.document.toString());
  });

  // TODO Write exception cases
});
