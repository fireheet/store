import { FakeOwnerWriteRepository } from '@core/owner/infra/repositories';
import {
  OwnerObjectMother,
  RepositoryOwnerObjectMother
} from '@core/owner/data/sources';
import { OwnerWriteRepository } from '@core/owner/data/contracts';

let ownersWriteRepository: OwnerWriteRepository;

describe('#FakeOwnerWriteRepository', () => {
  beforeEach(() => {
    ownersWriteRepository = new FakeOwnerWriteRepository();
  });

  it('should be possible to create an Repository Owner', async () => {
    const dto = OwnerObjectMother.valid();

    const owner = await ownersWriteRepository.create({
      name: dto.name,
      document: dto.document
    });

    expect(owner).toBeTruthy();
    expect(owner.id).toBeDefined();
    expect(owner.name).toBe(dto.name);
    expect(owner.document.toString()).toBe(dto.document.toString());
  });

  it('should be possible to update an Repository Owner', async () => {
    const dto = OwnerObjectMother.valid();

    const owner = await ownersWriteRepository.create({
      name: dto.name,
      document: dto.document
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const findIndexSpy = jest.spyOn(ownersWriteRepository, 'findOwnerIndex');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const returnSpy = jest.spyOn(ownersWriteRepository, 'update');

    const updateModel = RepositoryOwnerObjectMother.valid();
    updateModel.id = owner.id;
    updateModel.name = 'Test';

    const updateOwner = await ownersWriteRepository.update(updateModel);

    expect(updateOwner).toBeTruthy();
    expect(findIndexSpy).toHaveBeenCalled();
    expect(findIndexSpy).toHaveReturnedWith(0);
    expect(returnSpy).toHaveReturnedWith(Promise.resolve(true));
  });

  it('should not be possible to update an Repository Owner if it does not exist', async () => {
    const updateModel = RepositoryOwnerObjectMother.valid();
    const updateOwner = await ownersWriteRepository.update({
      id: updateModel.id,
      name: updateModel.name
    });

    expect(updateOwner).toBeFalsy();
  });

  it('should return true if Owner is disabled', async () => {
    const dto = OwnerObjectMother.valid();

    const owner = await ownersWriteRepository.create({
      name: dto.name,
      document: dto.document
    });

    owner.deleted_at = new Date();

    const enabled = await ownersWriteRepository.enable({
      id: owner.id
    });

    expect(enabled).toBeTruthy();
  });

  it('should return true if Owner is already enabled', async () => {
    const dto = OwnerObjectMother.valid();

    const owner = await ownersWriteRepository.create({
      name: dto.name,
      document: dto.document
    });

    const enabled = await ownersWriteRepository.enable({ id: owner.id });

    expect(enabled).toBeTruthy();
  });

  it("should return return false if Owner doesn't exist", async () => {
    const enabled = await ownersWriteRepository.enable({ id: '1' });

    expect(enabled).toBeFalsy();
  });

  it('should return true if Owner is enabled', async () => {
    const dto = OwnerObjectMother.valid();

    const owner = await ownersWriteRepository.create({
      name: dto.name,
      document: dto.document
    });

    const disabled = await ownersWriteRepository.disable({ id: owner.id });

    expect(disabled).toBeTruthy();
  });

  it('should return true if Owner is already disabled', async () => {
    const dto = OwnerObjectMother.valid();

    const owner = await ownersWriteRepository.create({
      name: dto.name,
      document: dto.document
    });

    owner.deleted_at = new Date();

    const disabled = await ownersWriteRepository.disable({ id: owner.id });

    expect(disabled).toBeTruthy();
  });

  it("should return return false if Owner doesn't exist", async () => {
    const disabled = await ownersWriteRepository.disable({ id: '1' });

    expect(disabled).toBeFalsy();
  });
});
