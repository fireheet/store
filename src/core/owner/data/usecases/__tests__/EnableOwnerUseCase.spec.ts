import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import { EnableOwner } from '@core/owner/domain/usecases';
import { IDDoesNotExistException } from '@core/shared/data/contracts';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';
import { EnableOwnerUseCase } from '..';

let enableOwner: EnableOwner;
let ownersReadRepository: FakeOwnerReadRepository;
let ownersWriteRepository: FakeOwnerWriteRepository;

describe('#EnableOwnerUseCase', () => {
  beforeEach(async () => {
    ownersReadRepository = new FakeOwnerReadRepository();
    ownersWriteRepository = new FakeOwnerWriteRepository();
    enableOwner = new EnableOwnerUseCase(
      ownersReadRepository,
      ownersWriteRepository
    );

    await ownersReadRepository.create(RepositoryOwnerObjectMother.valid());
  });

  describe('Success Cases', () => {
    it('should be possible to enable an Owner with an valid ID', async () => {
      const owner = ownersReadRepository.owners[0];

      const result = await enableOwner.enable({ id: owner.id });

      expect(result).toBeTruthy();
    });
  });

  describe('Exception Cases', () => {
    it('should not be possible to enable an Owner with an invalid ID', async () => {
      const dto = { id: 'invalid' };

      await expect(enableOwner.enable(dto)).rejects.toBeInstanceOf(
        IDDoesNotExistException
      );
    });
  });
});
