import { CreateUser } from '@domain/usecases/user';
import {
  DocumentNumberAlreadyExistException,
  EmailAlreadyExistException,
  InvalidBirthdateException,
  InvalidDataException,
} from '@data/contracts/exceptions';
import { CreateUserDTO } from '@data/dtos/user';
import {
  UsersReadRepository,
  UsersWriteRepository,
} from '@data/contracts/repositories/user';
import { UserModel } from '@data/models/user';

export class CreateUserService implements CreateUser {
  constructor(
    private readonly usersReadRepository: UsersReadRepository,
    private readonly usersWriteRepository: UsersWriteRepository,
  ) {}

  async create(userData: CreateUserDTO): Promise<UserModel> {
    if (typeof userData !== 'object') {
      throw new InvalidDataException();
    }

    const doesDocumentNumberExist =
      await this.usersReadRepository.findUserByDocumentNumber(
        userData.documentNumber,
      );

    if (doesDocumentNumberExist) {
      throw new DocumentNumberAlreadyExistException();
    }

    const doesEmailExist = await this.usersReadRepository.findUserByEmail(
      userData.email,
    );

    if (doesEmailExist) {
      throw new EmailAlreadyExistException();
    }

    const userBirthdate = new Date(userData.birthdate);

    if (userBirthdate.getUTCFullYear() < 1900) {
      throw new InvalidBirthdateException();
    }

    const user = await this.usersWriteRepository.writeUser(userData);

    await this.usersReadRepository.storeUser(user);

    return user;
  }
}
