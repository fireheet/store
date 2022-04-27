import { FakeOwnerWriteRepository } from '@core/owner/infra/repositories';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';

let ownersWriteRepository: FakeOwnerWriteRepository;

describe('#FakeOwnerWriteRepository', () => {
  beforeEach(() => {
    ownersWriteRepository = new FakeOwnerWriteRepository();
  });

  describe('create', () => {
    it('should be possible to create an Repository Owner', async () => {
      const mock = RepositoryOwnerObjectMother.valid();
      const owner = await ownersWriteRepository.create(mock);
      const storedOwner = ownersWriteRepository.owners[0];

      expect(owner).toBeTruthy();
      expect(ownersWriteRepository.owners).toHaveLength(1);
      expect(storedOwner.id).toBeDefined();
      expect(storedOwner.id).toBe(mock.id);
      expect(storedOwner.name).toBe(mock.name);
      expect(storedOwner.document.toString()).toBe(mock.document.toString());
    });
  });

  describe('update', () => {
    it('should be possible to update an Repository Owner', async () => {
      const owner = RepositoryOwnerObjectMother.valid();
      ownersWriteRepository.owners.push(owner);

      const updateModel = RepositoryOwnerObjectMother.valid();
      updateModel.id = owner.id;
      updateModel.name = 'Test';

      const updateOwner = await ownersWriteRepository.update(updateModel);
      const storedOwner = ownersWriteRepository.owners[0];

      expect(updateOwner).toBeTruthy();
      expect(ownersWriteRepository.owners).toHaveLength(1);
      expect(storedOwner.id).toBeDefined();
      expect(storedOwner.id).toBe(updateModel.id);
      expect(storedOwner.name).toBe(updateModel.name);
      expect(storedOwner.name).not.toBe(owner.name);
    });

    it('should not be possible to update an Repository Owner if it does not exist', async () => {
      const updateModel = RepositoryOwnerObjectMother.valid();
      const updateOwner = await ownersWriteRepository.update(updateModel);

      expect(updateOwner).toBeFalsy();
    });
  });

  describe('enable', () => {
    it('should return true if Owner is disabled', async () => {
      const disabledOwner = RepositoryOwnerObjectMother.disabled();
      ownersWriteRepository.owners.push(disabledOwner);

      const enabled = await ownersWriteRepository.enable({
        id: disabledOwner.id
      });

      expect(enabled).toBeTruthy();
    });

    it('should return true if Owner is already enabled', async () => {
      const owner = RepositoryOwnerObjectMother.valid();
      ownersWriteRepository.owners.push(owner);

      const enabled = await ownersWriteRepository.enable({ id: owner.id });

      expect(enabled).toBeTruthy();
    });

    it("should return return false if Owner doesn't exist", async () => {
      const enabled = await ownersWriteRepository.enable({ id: '1' });

      expect(enabled).toBeFalsy();
    });
  });

  describe('disable', () => {
    it('should return true if Owner is enabled', async () => {
      const owner = RepositoryOwnerObjectMother.valid();
      ownersWriteRepository.owners.push(owner);

      const disabled = await ownersWriteRepository.disable({ id: owner.id });

      expect(disabled).toBeTruthy();
    });

    it('should return true if Owner is already disabled', async () => {
      const owner = RepositoryOwnerObjectMother.disabled();
      ownersWriteRepository.owners.push(owner);

      const disabled = await ownersWriteRepository.disable({ id: owner.id });

      expect(disabled).toBeTruthy();
    });

    it("should return return false if Owner doesn't exist", async () => {
      const disabled = await ownersWriteRepository.disable({ id: '1' });

      expect(disabled).toBeFalsy();
    });
  });
});
