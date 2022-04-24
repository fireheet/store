import { UpdateOwner } from '@core/owner/domain/usecases';
import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import { IDDoesNotExistException } from '@core/shared/data/contracts';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';
import { UpdateOwnerUseCase } from '..';

let updateOwner: UpdateOwner;
let ownersReadRepository: FakeOwnerReadRepository;
let ownersWriteRepository: FakeOwnerWriteRepository;

describe('#UpdateOwnerUseCase', () => {
  beforeEach(async () => {
    ownersReadRepository = new FakeOwnerReadRepository();
    ownersWriteRepository = new FakeOwnerWriteRepository();

    const repositoryOwner = RepositoryOwnerObjectMother.valid();

    await ownersWriteRepository.create(repositoryOwner);
    await ownersReadRepository.create(repositoryOwner);

    updateOwner = new UpdateOwnerUseCase(
      ownersReadRepository,
      ownersWriteRepository
    );
  });

  describe('Success Cases', () => {
    it("should be possible update an Owner's name", async () => {
      const createdOwner = ownersWriteRepository.owners[0];

      const owner = await updateOwner.update({
        id: createdOwner.id,
        name: 'New'
      });

      expect(owner).toBeTruthy();
      expect(owner.name).toBe('New');
    });
  });

  describe('Exception Cases', () => {
    it('should not be possible to update an non-existing Owner', async () => {
      await expect(
        updateOwner.update({ id: 'invalid', name: 'New' })
      ).rejects.toBeInstanceOf(IDDoesNotExistException);
    });

    it(`should not be possible to update an Owner's name with more than 150 characters`, async () => {
      const createdOwner = ownersWriteRepository.owners[0];

      await expect(
        updateOwner.update({ id: createdOwner.id, name: 'a'.repeat(151) })
      ).rejects.toHaveProperty(
        'message',
        'name must be at most 150 characters'
      );
    });
  });
});
