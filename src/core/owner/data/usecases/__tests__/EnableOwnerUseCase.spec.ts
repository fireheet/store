import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import { EnableOwner } from '@core/owner/domain/usecases';
import { IDDoesNotExistException } from '@core/shared/data/contracts';
import { RepositoryOwnerObjectMother } from '@core/owner/data/sources';
import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts';
import { EnableOwnerUseCase } from '..';

let enableOwner: EnableOwner;
let fakeOwnersReadRepository: OwnerReadRepository;
let fakeOwnersWriteRepository: OwnerWriteRepository;

describe('#EnableOwnerUseCase', () => {
  beforeEach(() => {
    fakeOwnersReadRepository = new FakeOwnerReadRepository();
    fakeOwnersWriteRepository = new FakeOwnerWriteRepository();
    enableOwner = new EnableOwnerUseCase(
      fakeOwnersReadRepository,
      fakeOwnersWriteRepository
    );
  });

  describe('#EnableOwnerUseCase - Success Cases', () => {
    it('should be possible to enable an Owner with an valid ID', async () => {
      const owner = RepositoryOwnerObjectMother.valid();

      await fakeOwnersReadRepository.create(owner);

      const result = await enableOwner.enable({ id: owner.id });

      expect(result).toBeTruthy();
    });
  });

  describe('#EnableOwnerUseCase - Exception Cases', () => {
    it('should not be possible to enable an Owner with an invalid ID', async () => {
      await expect(
        enableOwner.enable({ id: 'invalid' })
      ).rejects.toBeInstanceOf(IDDoesNotExistException);
    });

    it('should not be possible to enable an Owner with no id', async () => {
      const dto = { id: '1234' };

      Reflect.deleteProperty(dto, 'id');

      await expect(enableOwner.enable(dto)).rejects.toThrowError(
        'id does not exist!'
      );

      await expect(enableOwner.enable(dto)).rejects.toThrow(
        new IDDoesNotExistException()
      );
    });
  });
});
