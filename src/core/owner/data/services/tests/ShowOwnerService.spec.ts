import { FakeOwnerReadRepository } from '@core/owner/infra';
import { ShowOwner } from '@core/owner/domain';
import { ShowOwnerService } from '../ShowOwnerService';
import { OwnerMockFactory } from '../../sources';
import { IDDoesNotExistException } from '../../../../shared/data';

let showOwner: ShowOwner;
let ownerReadRepository: FakeOwnerReadRepository;

const createRepositoryOwner = OwnerMockFactory.makeRepositoryOwnerModel;

describe('ShowOwnerService', () => {
  beforeEach(async () => {
    ownerReadRepository = new FakeOwnerReadRepository();
    showOwner = new ShowOwnerService(ownerReadRepository);

    await ownerReadRepository.create(createRepositoryOwner());
  });

  it('should be possible to show an Owner with an valid ID', async () => {
    const owner = ownerReadRepository.owners[0];

    const dto = { id: owner.id };
    const result = await showOwner.show(dto);

    expect(result).toBeTruthy();
    expect(result.document.toString()).toBe(owner.document.toString());
    expect(result.name).toBe(owner.name);
  });

  it('should not be possible to show an Owner with an invalid ID', async () => {
    const dto = { id: 'invalid' };

    await expect(showOwner.show(dto)).rejects.toBeInstanceOf(
      IDDoesNotExistException
    );
  });
});
