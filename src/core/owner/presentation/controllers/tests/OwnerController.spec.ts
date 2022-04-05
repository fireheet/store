import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra';
import { CreateOwnerService, OwnerMockFactory } from '@core/owner/data';
import { OwnerController } from '../OwnerController';
import { CreateOwner } from '../../../domain';
import { OwnerViewModel } from '../../views/OwnerViewModel';

let ownerController: OwnerController;
let createOwner: CreateOwner;
let fakeOwnerReadRepository: FakeOwnerReadRepository;
let fakeOwnerWriteRepository: FakeOwnerWriteRepository;

const ownerDtoFactory = OwnerMockFactory.makeInputCreateOwnerDTO;

describe('OwnerController', () => {
  beforeEach(() => {
    fakeOwnerWriteRepository = new FakeOwnerWriteRepository();
    fakeOwnerReadRepository = new FakeOwnerReadRepository();
    createOwner = new CreateOwnerService(
      fakeOwnerReadRepository,
      fakeOwnerWriteRepository
    );
    ownerController = new OwnerController(createOwner);
  });

  describe('create', () => {
    it('should return an Http Response with Owner View Model', async () => {
      const createOwnerDto = ownerDtoFactory();

      const response = await ownerController.create({ body: createOwnerDto });

      const owner = response.data as OwnerViewModel;

      expect(owner.name).toEqual(createOwnerDto.name);
      expect(owner.isEnabled).toBeTruthy();
      expect(owner).toBeInstanceOf(OwnerViewModel);
    });

    it('should return an Http Response with status code 201', async () => {
      const createOwnerDto = ownerDtoFactory();

      const response = await ownerController.create({ body: createOwnerDto });

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(201);
    });

    it('should return an Http Response with status code 400 if Document is invalid', async () => {
      const createOwnerDto = ownerDtoFactory({ documentNumber: '123' });

      const createFunction = jest.spyOn(createOwner, 'create');

      const response = await ownerController.create({ body: createOwnerDto });

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(400);
      expect(response.data).toHaveProperty('message');
      expect(createFunction).toThrowError();
    });

    it('should return an Http Response with status code 400 if Name is too long', async () => {
      const createOwnerDto = ownerDtoFactory({ name: 'a'.repeat(151) });

      const createFunction = jest.spyOn(createOwner, 'create');

      const response = await ownerController.create({ body: createOwnerDto });

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
