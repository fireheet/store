import {
  UsersReadRepository,
  UsersWriteRepository,
} from '@data/contracts/repositories';
import { CreateUserService } from '@data/services/user';
import {
  FakeUsersReadRepository,
  FakeUsersWriteRepository,
} from '@infra/repositories';
import { makeCreateUserDTOMock } from '@data/sources/data';
import { DocumentNumberAlreadyExistException } from '@data/contracts/exceptions';

let createUsersService: CreateUserService;
let usersWriteRepository: UsersWriteRepository;
let usersReadRepository: UsersReadRepository;

describe('CreateUserService', () => {
  beforeEach(() => {
    usersReadRepository = new FakeUsersReadRepository();
    usersWriteRepository = new FakeUsersWriteRepository();
    createUsersService = new CreateUserService(
      usersReadRepository,
      usersWriteRepository,
    );
  });

  it('Should not create User with same Document Number', async () => {
    const documentNumber = '12345678910';

    const userData = makeCreateUserDTOMock({ documentNumber });

    await createUsersService.create(userData);

    await expect(createUsersService.create(userData)).rejects.toBeInstanceOf(
      DocumentNumberAlreadyExistException,
    );
  });

  it('Should not create User with same Email', () => {
    expect(1).toBe(2);
  });

  it("Should hash the User's password", () => {
    expect(1).toBe(2);
  });

  it('Should create a User if given valid data', () => {
    expect(1).toBe(2);
  });

  it('Should create and persist the User in the Write Database', () => {
    expect(1).toBe(2);
  });

  it('Should store the persisted User in Read Database', () => {
    expect(1).toBe(2);
  });
});
