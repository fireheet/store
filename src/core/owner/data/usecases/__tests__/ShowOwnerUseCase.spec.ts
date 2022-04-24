import { FakeOwnerReadRepository } from '@core/owner/infra/repositories';
import { ShowOwner } from '@core/owner/domain/usecases';
import { IDDoesNotExistException } from '@core/shared/data/contracts';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';
import { ShowOwnerUseCase } from '..';

let showOwner: ShowOwner;
let ownerReadRepository: FakeOwnerReadRepository;

describe('#ShowOwnerUseCase', () => {
  beforeEach(async () => {
    ownerReadRepository = new FakeOwnerReadRepository();
    showOwner = new ShowOwnerUseCase(ownerReadRepository);

    await ownerReadRepository.create(RepositoryOwnerObjectMother.valid());
  });

  describe('Success Cases', () => {
    it('should be possible to show an Owner with an valid ID', async () => {
      const owner = ownerReadRepository.owners[0];

      const findOwner = jest.spyOn(ownerReadRepository, 'findByID');

      const result = await showOwner.show({ id: owner.id });

      expect(result).toBeTruthy();
      expect(result.document.toString()).toBe(owner.document.toString());
      expect(result.name).toBe(owner.name);
      expect(result.id).toBe(owner.id);
      expect(findOwner).toBeCalledTimes(1);
    });
  });

  describe('Exception Cases', () => {
    it('should not be possible to show an Owner with an invalid ID', async () => {
      await expect(showOwner.show({ id: 'invalid' })).rejects.toBeInstanceOf(
        IDDoesNotExistException
      );
    });
  });
});
