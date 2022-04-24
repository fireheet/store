import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import { DisableOwner } from '@core/owner/domain/usecases';
import { IDDoesNotExistException } from '@core/shared/data/contracts';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';
import { DisableOwnerUseCase } from '..';

let disableOwner: DisableOwner;
let ownersReadRepository: FakeOwnerReadRepository;
let ownersWriteRepository: FakeOwnerWriteRepository;

describe('#DisableOwnerUseCase', () => {
  beforeEach(async () => {
    ownersReadRepository = new FakeOwnerReadRepository();
    ownersWriteRepository = new FakeOwnerWriteRepository();
    disableOwner = new DisableOwnerUseCase(
      ownersReadRepository,
      ownersWriteRepository
    );

    await ownersReadRepository.create(RepositoryOwnerObjectMother.valid());
  });

  describe('Success Cases', () => {
    it('should be possible to disable an Owner with an valid ID', async () => {
      const owner = ownersReadRepository.owners[0];

      const dto = { id: owner.id };
      const result = await disableOwner.disable(dto);

      expect(result).toBeTruthy();
    });
  });

  describe('Exception Cases', () => {
    it('should not be possible to disable an Owner with an invalid ID', async () => {
      await expect(
        disableOwner.disable({ id: 'invalid' })
      ).rejects.toBeInstanceOf(IDDoesNotExistException);
    });
  });
});
