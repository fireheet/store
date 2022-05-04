import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import { DisableOwner } from '@core/owner/domain/usecases';
import { IDDoesNotExistException } from '@core/shared/data/contracts';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';
import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts';
import { DisableOwnerUseCase } from '..';

let disableOwner: DisableOwner;
let fakeOwnersReadRepository: OwnerReadRepository;
let fakeOwnersWriteRepository: OwnerWriteRepository;

describe('#DisableOwnerUseCase', () => {
  beforeEach(() => {
    fakeOwnersReadRepository = new FakeOwnerReadRepository();
    fakeOwnersWriteRepository = new FakeOwnerWriteRepository();
    disableOwner = new DisableOwnerUseCase(
      fakeOwnersReadRepository,
      fakeOwnersWriteRepository
    );
  });

  describe('#DisableOwnerUseCase - Success Cases', () => {
    it('should be possible to disable an Owner with an valid ID', async () => {
      const owner = RepositoryOwnerObjectMother.valid();

      await fakeOwnersReadRepository.create(owner);

      const dto = { id: owner.id };
      const result = await disableOwner.disable(dto);

      expect(result).toBeTruthy();
    });
  });

  describe('#DisableOwnerUseCase - Exception Cases', () => {
    it('should not be possible to disable an Owner with an invalid id', async () => {
      await fakeOwnersReadRepository.create(
        RepositoryOwnerObjectMother.valid()
      );
      await expect(
        disableOwner.disable({ id: 'invalid' })
      ).rejects.toBeInstanceOf(IDDoesNotExistException);
    });

    it('should not be possible to disable an Owner with no id', async () => {
      const dto = { id: '1234' };

      Reflect.deleteProperty(dto, 'id');

      await expect(disableOwner.disable(dto)).rejects.toThrowError(
        'id does not exist!'
      );

      await expect(disableOwner.disable(dto)).rejects.toThrow(
        new IDDoesNotExistException()
      );
    });
  });
});
