import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra';
import { CreateOwnerService } from '@core/owner/data';
import { OwnerController } from '../OwnerController';
import { CreateOwner, ShowOwner, UpdateOwner } from '../../../domain';
import { OwnerViewModel } from '../../views/OwnerViewModel';
import { UpdateOwnerService } from '../../../data/services/UpdateOwnerService';
import { ShowOwnerService } from '../../../data/services/ShowOwnerService';

let ownerController: OwnerController;
let createOwner: CreateOwner;
let updateOwner: UpdateOwner;
let showOwner: ShowOwner;
let fakeOwnerReadRepository: FakeOwnerReadRepository;
let fakeOwnerWriteRepository: FakeOwnerWriteRepository;

describe('OwnerController', () => {
  beforeEach(() => {
    fakeOwnerWriteRepository = new FakeOwnerWriteRepository();
    fakeOwnerReadRepository = new FakeOwnerReadRepository();

    createOwner = new CreateOwnerService(
      fakeOwnerReadRepository,
      fakeOwnerWriteRepository
    );

    updateOwner = new UpdateOwnerService(
      fakeOwnerReadRepository,
      fakeOwnerWriteRepository
    );

    showOwner = new ShowOwnerService(fakeOwnerReadRepository);

    ownerController = new OwnerController(createOwner, updateOwner, showOwner);
  });

  describe('create', () => {
    it('should return an Http Response with Owner View Model', async () => {
      const response = await ownerController.create({
        body: { name: 'John', documentNumber: '12345678901' }
      });

      const owner = response.data as OwnerViewModel;

      expect(owner.name).toEqual('John');
      expect(owner).not.toHaveProperty('document');
    });

    it('should return an Http Response with status code 201', async () => {
      const response = await ownerController.create({
        body: { name: 'John', documentNumber: '12345678901' }
      });

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(201);
    });

    it('should return an Http Response with status code 400 if Document is invalid', async () => {
      const createFunction = jest.spyOn(createOwner, 'create');

      const response = await ownerController.create({
        body: { name: 'John', documentNumber: '123' }
      });

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(400);
      expect(response.data).toHaveProperty('message');
      expect(createFunction).toThrowError();
    });

    it('should return an Http Response with status code 400 if Name is too long', async () => {
      const createFunction = jest.spyOn(createOwner, 'create');

      const response = await ownerController.create({
        body: { name: 'a'.repeat(151), documentNumber: '123' }
      });

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(400);
      expect(response.data).toHaveProperty('message');
      expect(createFunction).toThrowError();
    });

    it('should return an Http Response with status code 400 if any of the fields are empty', async () => {
      // TODO implement this test
    });
  });
});
