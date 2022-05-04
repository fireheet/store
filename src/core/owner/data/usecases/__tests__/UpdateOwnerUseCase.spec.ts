import { UpdateOwner } from '@core/owner/domain/usecases';
import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import { IDDoesNotExistException } from '@core/shared/data/contracts';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';
import { UpdateOwnerUseCase } from '..';
import { OwnerReadRepository, OwnerWriteRepository } from '../../contracts';

let updateOwner: UpdateOwner;
let fakeOwnersReadRepository: OwnerReadRepository;
let fakeOwnersWriteRepository: OwnerWriteRepository;

describe('#UpdateOwnerUseCase', () => {
  beforeEach(() => {
    fakeOwnersReadRepository = new FakeOwnerReadRepository();
    fakeOwnersWriteRepository = new FakeOwnerWriteRepository();

    updateOwner = new UpdateOwnerUseCase(
      fakeOwnersReadRepository,
      fakeOwnersWriteRepository
    );
  });

  describe('#UpdateOwnerUseCase - Success Cases', () => {
    it("should be possible update an Owner's name", async () => {
      const repositoryOwner = RepositoryOwnerObjectMother.valid();
      await fakeOwnersWriteRepository.create(repositoryOwner);
      await fakeOwnersReadRepository.create(repositoryOwner);

      const owner = await updateOwner.update({
        id: repositoryOwner.id,
        name: 'New'
      });

      expect(owner).toBeTruthy();
      expect(owner.name).toBe('New');
    });
  });

  describe('#UpdateOwnerUseCase - Exception Cases', () => {
    it('should not be possible to update an non-existing Owner', async () => {
      await expect(
        updateOwner.update({ id: 'invalid', name: 'New' })
      ).rejects.toBeInstanceOf(IDDoesNotExistException);
    });

    it(`should not be possible to update an Owner's name with more than 150 characters`, async () => {
      const repositoryOwner = RepositoryOwnerObjectMother.valid();
      await fakeOwnersWriteRepository.create(repositoryOwner);
      await fakeOwnersReadRepository.create(repositoryOwner);

      await expect(
        updateOwner.update({ id: repositoryOwner.id, name: 'a'.repeat(151) })
      ).rejects.toHaveProperty(
        'message',
        'name must be at most 150 characters'
      );
    });
  });
});
