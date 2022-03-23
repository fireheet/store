import { FakeOwnerWriteRepository } from '@core/owner/infra';
import { OwnerMockFactory } from '@core/owner/data';

let ownersWriteRepository: FakeOwnerWriteRepository;

describe('FakeOwnerWriteRepository', () => {
  beforeEach(() => {
    ownersWriteRepository = new FakeOwnerWriteRepository();
  });

  it('should be possible to create an Repository Owner', async () => {
    const model = OwnerMockFactory.makeOwnerModel();

    const owner = await ownersWriteRepository.create(model);
    const storedOwner = ownersWriteRepository.owners[0];

    expect(owner).toBeTruthy();
    expect(ownersWriteRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.name).toBe(model.name);
    expect(storedOwner.document.toString()).toBe(model.document.toString());
    expect(storedOwner.isEnabled).toBe(true);
  });

  it('should be possible to update an Repository Owner', async () => {
    const model = OwnerMockFactory.makeOwnerModel({ name: 'John' });

    const repositoryOwner = await ownersWriteRepository.create(model);

    const updateModel = OwnerMockFactory.makeRepositoryOwnerModel({
      ...repositoryOwner,
      name: 'New'
    });

    const updateOwner = await ownersWriteRepository.update(updateModel);
    const storedOwner = ownersWriteRepository.owners[0];

    expect(updateOwner).toBeTruthy();
    expect(ownersWriteRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.id).toBe(updateModel.id);
    expect(storedOwner.name).toBe(updateModel.name);
    expect(storedOwner.name).not.toBe(model.name);
  });

  it('should be possible to enable an Repository Owner', async () => {
    const model = OwnerMockFactory.makeOwnerModel();

    const owner = await ownersWriteRepository.create(model);

    const enableOwner = await ownersWriteRepository.enable({ id: owner.id });
    const storedOwner = ownersWriteRepository.owners[0];

    expect(enableOwner).toBeTruthy();
    expect(ownersWriteRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.id).toBe(owner.id);
    expect(storedOwner.isEnabled).toBe(true);
  });

  it('should be possible to disable an Repository Owner', async () => {
    const model = OwnerMockFactory.makeOwnerModel();

    const owner = await ownersWriteRepository.create(model);

    const disableOwner = await ownersWriteRepository.disable({
      id: owner.id
    });

    const storedOwner = ownersWriteRepository.owners[0];

    expect(disableOwner).toBeTruthy();
    expect(ownersWriteRepository.owners).toHaveLength(1);
    expect(storedOwner.id).toBeDefined();
    expect(storedOwner.id).toBe(owner.id);
    expect(storedOwner.isEnabled).toBe(false);
    expect(storedOwner.disabled_at).toBeDefined();
  });

  // TODO Write exception cases
});
