import { FakeOwnerReadRepository } from '@core/owner/infra/repositories';
import { ShowOwner } from '@core/owner/domain/usecases';
import { IDDoesNotExistException } from '@core/shared/data/contracts';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';
import { ShowOwnerUseCase } from '..';
import { OwnerReadRepository } from '../../contracts';

let showOwner: ShowOwner;
let fakeOwnersReadRepository: OwnerReadRepository;

describe('#ShowOwnerUseCase', () => {
  beforeEach(() => {
    fakeOwnersReadRepository = new FakeOwnerReadRepository();
    showOwner = new ShowOwnerUseCase(fakeOwnersReadRepository);
  });

  describe('#ShowOwnerUseCase - Success Cases', () => {
    it('should be possible to show an Owner with an valid ID', async () => {
      const owner = RepositoryOwnerObjectMother.valid();

      await fakeOwnersReadRepository.create(owner);

      const findOwner = jest.spyOn(fakeOwnersReadRepository, 'findByID');

      const result = await showOwner.show({ id: owner.id });

      expect(result).toBeTruthy();
      expect(result.document.toString()).toBe(owner.document.toString());
      expect(result.name).toBe(owner.name);
      expect(result.id).toBe(owner.id);
      expect(findOwner).toBeCalledTimes(1);
    });
  });

  describe('#ShowOwnerUseCase - Exception Cases', () => {
    it('should not be possible to show an Owner with an invalid ID', async () => {
      await fakeOwnersReadRepository.create(
        RepositoryOwnerObjectMother.valid()
      );

      await expect(showOwner.show({ id: 'invalid' })).rejects.toBeInstanceOf(
        IDDoesNotExistException
      );
    });

    it('should not be possible to enable an Owner with no id', async () => {
      const dto = { id: '1234' };

      Reflect.deleteProperty(dto, 'id');

      await expect(showOwner.show(dto)).rejects.toThrowError(
        'id does not exist!'
      );

      await expect(showOwner.show(dto)).rejects.toThrow(
        new IDDoesNotExistException()
      );
    });
  });
});
