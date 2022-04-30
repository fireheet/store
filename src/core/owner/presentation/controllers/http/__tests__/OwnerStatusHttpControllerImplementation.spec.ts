import {
  DisableOwnerUseCase,
  EnableOwnerUseCase
} from '@core/owner/data/usecases';
import { DisableOwner, EnableOwner } from '@core/owner/domain/usecases';
import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import { RepositoryOwnerObjectMother } from '../../../../data/sources';
import { OwnerStatusHttpControllerImplementation } from '../OwnerStatusHttpControllerImplementation';

let ownerStatusHttpController: OwnerStatusHttpControllerImplementation;
let enableOwner: EnableOwner;
let disableOwner: DisableOwner;
let fakeOwnerReadRepository: FakeOwnerReadRepository;
let fakeOwnerWriteRepository: FakeOwnerWriteRepository;

describe('#OwnerStatusHttpControllerImplementation', () => {
  beforeEach(() => {
    fakeOwnerWriteRepository = new FakeOwnerWriteRepository();
    fakeOwnerReadRepository = new FakeOwnerReadRepository();
    enableOwner = new EnableOwnerUseCase(
      fakeOwnerReadRepository,
      fakeOwnerWriteRepository
    );
    disableOwner = new DisableOwnerUseCase(
      fakeOwnerReadRepository,
      fakeOwnerWriteRepository
    );
    ownerStatusHttpController = new OwnerStatusHttpControllerImplementation(
      enableOwner,
      disableOwner
    );
  });

  describe('enable', () => {
    test('enable owner with valid input', async () => {
      const owner = RepositoryOwnerObjectMother.valid();

      await fakeOwnerReadRepository.create(owner);

      const response = await ownerStatusHttpController.update({
        body: {
          id: owner.id
        }
      });

      expect(response.statusCode).toBe(200);
      expect(response.data).toStrictEqual(`Owner ${owner.id} enabled.`);
    });

    test('throw exception on invalid input', async () => {
      const response = await ownerStatusHttpController.update({
        body: {
          id: '123'
        }
      });

      expect(response.statusCode).toBe(400);
      expect(response.data).toHaveProperty('name', 'IDDoesNotExistException');
      expect(response.data).toHaveProperty('message', 'id does not exist!');
    });
  });

  describe('disable', () => {
    test('disable owner with valid input', async () => {
      const owner = RepositoryOwnerObjectMother.valid();

      await fakeOwnerReadRepository.create(owner);

      const response = await ownerStatusHttpController.delete({
        body: {
          id: owner.id
        }
      });

      expect(response.statusCode).toBe(200);
      expect(response.data).toStrictEqual(`Owner ${owner.id} disabled.`);
    });

    test('throw exception on invalid input', async () => {
      const response = await ownerStatusHttpController.delete({
        body: {
          id: '123'
        }
      });

      expect(response.statusCode).toBe(400);
      expect(response.data).toHaveProperty('name', 'IDDoesNotExistException');
      expect(response.data).toHaveProperty('message', 'id does not exist!');
    });
  });
});
