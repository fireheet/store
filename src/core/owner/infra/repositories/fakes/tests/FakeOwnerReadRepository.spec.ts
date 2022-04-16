import { FakeOwnerReadRepository } from '@core/owner/infra/repositories';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';

let ownersReadRepository: FakeOwnerReadRepository;

describe('#FakeOwnerReadRepository', () => {
  beforeEach(() => {
    ownersReadRepository = new FakeOwnerReadRepository();
  });

  describe('create', () => {
    it('should be possible to create an Repository Owner', async () => {
      const mock = RepositoryOwnerObjectMother.valid();
      const owner = await ownersReadRepository.create(mock);
      const storedOwner = ownersReadRepository.owners[0];

      expect(owner).toBeTruthy();
      expect(ownersReadRepository.owners).toHaveLength(1);
      expect(storedOwner.id).toBeDefined();
      expect(storedOwner.id).toBe(mock.id);
      expect(storedOwner.name).toBe(mock.name);
      expect(storedOwner.document.toString()).toBe(mock.document.toString());
    });
  });

  describe('replace', () => {
    it('should be possible to replace an Repository Owner', async () => {
      const owner = RepositoryOwnerObjectMother.valid();
      ownersReadRepository.owners.push(owner);

      const updateModel = RepositoryOwnerObjectMother.valid();
      updateModel.id = owner.id;
      updateModel.name = 'Test 2';

      const updateOwner = await ownersReadRepository.replace(updateModel);
      const storedOwner = ownersReadRepository.owners[0];

      expect(updateOwner).toBeTruthy();
      expect(ownersReadRepository.owners).toHaveLength(1);
      expect(storedOwner.id).toBeDefined();
      expect(storedOwner.id).toBe(updateModel.id);
      expect(storedOwner.name).toBe(updateModel.name);
      expect(storedOwner.name).not.toBe(owner.name);
    });
  });

  describe('enable', () => {
    it('should return true if Owner is disabled', async () => {
      const disabledOwner = RepositoryOwnerObjectMother.disabled();
      ownersReadRepository.owners.push(disabledOwner);

      const enabled = await ownersReadRepository.enable({
        id: disabledOwner.id
      });

      expect(enabled).toBeTruthy();
    });

    it('should return true if Owner is already enabled', async () => {
      const owner = RepositoryOwnerObjectMother.valid();
      ownersReadRepository.owners.push(owner);

      const enabled = await ownersReadRepository.enable({ id: owner.id });

      expect(enabled).toBeTruthy();
    });

    it("should return return false if Owner doesn't exist", async () => {
      const enabled = await ownersReadRepository.enable({ id: '1' });

      expect(enabled).toBeFalsy();
    });
  });

  describe('disable', () => {
    it('should return true if Owner is enabled', async () => {
      const owner = RepositoryOwnerObjectMother.valid();
      ownersReadRepository.owners.push(owner);

      const disabled = await ownersReadRepository.disable({ id: owner.id });

      expect(disabled).toBeTruthy();
    });

    it('should return true if Owner is already disabled', async () => {
      const owner = RepositoryOwnerObjectMother.disabled();
      ownersReadRepository.owners.push(owner);

      const disabled = await ownersReadRepository.disable({ id: owner.id });

      expect(disabled).toBeTruthy();
    });

    it("should return return false if Owner doesn't exist", async () => {
      const disabled = await ownersReadRepository.disable({ id: '1' });

      expect(disabled).toBeFalsy();
    });
  });

  describe('findByID', () => {
    it('should return an Repository Owner if ID exists', async () => {
      const owner = RepositoryOwnerObjectMother.valid();
      ownersReadRepository.owners.push(owner);

      const foundOwner = await ownersReadRepository.findByID(owner.id);

      expect(foundOwner).toBeTruthy();
      expect(foundOwner.id).toBe(owner.id);
      expect(foundOwner.name).toBe(owner.name);
      expect(foundOwner.document.toString()).toBe(owner.document.toString());
    });

    it("should return undefined if Repository Owner doesn't exists", async () => {
      const owner = await ownersReadRepository.findByID('1');

      expect(owner).toBeUndefined();
    });
  });

  describe('findByDocument', () => {
    it('should return an Repository Owner if Document exists', async () => {
      const owner = RepositoryOwnerObjectMother.valid();
      ownersReadRepository.owners.push(owner);

      const foundOwner = await ownersReadRepository.findByDocument(
        owner.document
      );

      expect(foundOwner).toBeTruthy();
      expect(foundOwner.id).toBe(owner.id);
      expect(foundOwner.name).toBe(owner.name);
      expect(foundOwner.document.toString()).toBe(owner.document.toString());
    });

    it("should return undefined if Document doesn't exists", async () => {
      const owner = await ownersReadRepository.findByDocument({
        number: '12345678901'
      });

      expect(owner).toBeUndefined();
    });
  });
});
