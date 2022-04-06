import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra';
import { EnableOwner } from '@core/owner/domain';
import { IDDoesNotExistException } from '@core/shared/data';
import { OwnerMockFactory } from '../../sources';
import { EnableOwnerService } from '../EnableOwnerService';

let enableOwner: EnableOwner;
let ownersReadRepository: FakeOwnerReadRepository;
let ownersWriteRepository: FakeOwnerWriteRepository;

const createRepositoryOwner = OwnerMockFactory.makeRepositoryOwnerDTO;

describe('EnableOwnerService', () => {
  beforeEach(async () => {
    ownersReadRepository = new FakeOwnerReadRepository();
    ownersWriteRepository = new FakeOwnerWriteRepository();
    enableOwner = new EnableOwnerService(
      ownersReadRepository,
      ownersWriteRepository
    );

    await ownersReadRepository.create(createRepositoryOwner());
  });

  describe('Success Cases', () => {
    it('should be possible to enable an Owner with an valid ID', async () => {
      const owner = ownersReadRepository.owners[0];

      const dto = { id: owner.id };
      const result = await enableOwner.enable(dto);

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
