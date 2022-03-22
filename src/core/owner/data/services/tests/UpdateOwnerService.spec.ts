import { CreateOwner, UpdateOwner } from '@core/owner/domain/usecases';
import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra';
import { OwnerMockFactory } from '@core/owner/data/sources';
import {
  IDDoesNotExistException,
  InvalidNameException
} from '@core/shared/data';
import { OwnerConstants } from '@core/owner/config';
import { UpdateOwnerService } from '../UpdateOwnerService';
import { CreateOwnerService } from '../CreateOwnerService';

let createOwner: CreateOwner;
let updateOwner: UpdateOwner;
let ownersReadRepository: FakeOwnerReadRepository;
let ownersWriteRepository: FakeOwnerWriteRepository;

const createOwnerDto = OwnerMockFactory.makeCreateOwnerDTO;
const updateOwnerDTO = OwnerMockFactory.makeUpdateOwnerDTO;

describe('UpdateOwnerService', () => {
  beforeEach(async () => {
    ownersReadRepository = new FakeOwnerReadRepository();
    ownersWriteRepository = new FakeOwnerWriteRepository();

    createOwner = new CreateOwnerService(
      ownersReadRepository,
      ownersWriteRepository
    );

    const createDto = createOwnerDto();
    await createOwner.create(createDto);

    updateOwner = new UpdateOwnerService(
      ownersReadRepository,
      ownersWriteRepository
    );
  });

  it("should be possible update an Owner's name", async () => {
    const createdOwner = ownersWriteRepository.owners[0];

    const dto = updateOwnerDTO({ id: createdOwner.id, name: 'New' });
    const owner = await updateOwner.update(dto);

    const updatedOwner = ownersWriteRepository.owners[0];

    expect(owner).toBeTruthy();
    expect(updatedOwner.name).toBe(dto.name);
  });

  it('should not be possible to update an non-existing Owner', async () => {
    const dto = updateOwnerDTO({ id: 'non-existing-id' });

    await expect(updateOwner.update(dto)).rejects.toBeInstanceOf(
      IDDoesNotExistException
    );
  });

  it(
    `should not be possible to update an Owner's with more than ` +
      `${OwnerConstants.NAME_MAX_LENGTH} characters`,
    async () => {
      const createdOwner = ownersWriteRepository.owners[0];

      const dto = updateOwnerDTO({
        id: createdOwner.id,
        name: 'a'.repeat(OwnerConstants.NAME_MAX_LENGTH + 1)
      });

      await expect(updateOwner.update(dto)).rejects.toBeInstanceOf(
        InvalidNameException
      );
    }
  );
});
