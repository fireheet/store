import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra';
import { DisableOwner } from '@core/owner/domain';
import { IDDoesNotExistException } from '@core/shared/data';
import { DisableOwnerService } from '../DisableOwnerService';
import { RepositoryOwnerModelMock } from '../../sources/mocks/RepositoryOwnerModelMock';

let disableOwner: DisableOwner;
let ownersReadRepository: FakeOwnerReadRepository;
let ownersWriteRepository: FakeOwnerWriteRepository;

describe('DisableOwnerService', () => {
  beforeEach(async () => {
    ownersReadRepository = new FakeOwnerReadRepository();
    ownersWriteRepository = new FakeOwnerWriteRepository();
    disableOwner = new DisableOwnerService(
      ownersReadRepository,
      ownersWriteRepository
    );

    await ownersReadRepository.create(RepositoryOwnerModelMock());
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
      const dto = { id: 'invalid' };

      await expect(disableOwner.disable(dto)).rejects.toBeInstanceOf(
        IDDoesNotExistException
      );
    });
  });
});
