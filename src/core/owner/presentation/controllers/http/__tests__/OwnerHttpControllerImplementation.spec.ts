import {
  CreateOwnerUseCase,
  ShowOwnerUseCase,
  UpdateOwnerUseCase
} from '@core/owner/data/usecases';
import {
  CreateOwner,
  ShowOwner,
  UpdateOwner
} from '@core/owner/domain/usecases';
import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import {
  OwnerPropsObjectMother,
  RepositoryOwnerObjectMother
} from '@core/owner/data/sources';
import { OwnerHttpControllerImplementation } from '../OwnerHttpControllerImplementation';

let ownerHttpController: OwnerHttpControllerImplementation;
let createOwner: CreateOwner;
let updateOwner: UpdateOwner;
let showOwner: ShowOwner;
let fakeOwnerReadRepository: FakeOwnerReadRepository;
let fakeOwnerWriteRepository: FakeOwnerWriteRepository;

describe('#OwnerHttpControllerImplementation', () => {
  beforeEach(() => {
    fakeOwnerWriteRepository = new FakeOwnerWriteRepository();
    fakeOwnerReadRepository = new FakeOwnerReadRepository();
    createOwner = new CreateOwnerUseCase(
      fakeOwnerReadRepository,
      fakeOwnerWriteRepository
    );
    updateOwner = new UpdateOwnerUseCase(
      fakeOwnerReadRepository,
      fakeOwnerWriteRepository
    );
    showOwner = new ShowOwnerUseCase(fakeOwnerReadRepository);
    ownerHttpController = new OwnerHttpControllerImplementation(
      createOwner,
      updateOwner,
      showOwner
    );
  });

  describe('create', () => {
    test('create owner with valid input', async () => {
      const body = OwnerPropsObjectMother.withoutID();

      const response = await ownerHttpController.create({ body });

      expect(response.statusCode).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name', body.name);
      expect(response.data).not.toHaveProperty('document');
    });

    test('throw exception on invalid input', async () => {
      const body = OwnerPropsObjectMother.withoutName();

      const response = await ownerHttpController.create({ body });

      expect(response.statusCode).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });

  describe('update', () => {
    test('update owner with valid input', async () => {
      const owner = RepositoryOwnerObjectMother.valid();

      await fakeOwnerReadRepository.create(owner);

      const response = await ownerHttpController.update({
        body: {
          id: owner.id,
          name: 'new name'
        }
      });

      expect(response.statusCode).toBe(200);
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name', 'new name');
      expect(response.data).not.toHaveProperty('document');
    });

    test('throw exception on invalid input', async () => {
      const response = await ownerHttpController.update({
        body: {
          id: '123'
        }
      });

      expect(response.statusCode).toBe(400);
      expect(response.data).toHaveProperty('name', 'IDDoesNotExistException');
      expect(response.data).toHaveProperty('message', 'id does not exist!');
    });
  });

  describe('show', () => {
    test('show owner with valid input', async () => {
      const owner = RepositoryOwnerObjectMother.valid();

      await fakeOwnerReadRepository.create(owner);

      const response = await ownerHttpController.show({
        body: {
          id: owner.id
        }
      });

      expect(response.statusCode).toBe(200);
      expect(response.data).toHaveProperty('id', owner.id);
      expect(response.data).toHaveProperty('name', owner.name);
      expect(response.data).not.toHaveProperty('document');
    });

    test('throw exception on invalid input', async () => {
      const response = await ownerHttpController.show({
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
