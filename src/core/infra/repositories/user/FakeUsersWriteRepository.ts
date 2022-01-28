import {
  CreateUserDTO,
  RepositoryUserDTO,
  UpdateUserDTO,
} from '@data/dtos/user';
import { makeRepositoryUserDTOMock } from '@data/sources/data/mocks';
import { UsersWriteRepository } from '@data/contracts/repositories';

export class FakeUsersWriteRepository implements UsersWriteRepository {
  users: RepositoryUserDTO[] = [];

  // eslint-disable-next-line @typescript-eslint/require-await
  async writeUser(createUserDTO: CreateUserDTO): Promise<RepositoryUserDTO> {
    const { birthdate, ...user } = createUserDTO;
    const userModel = { ...user, birthdate: new Date(birthdate) };

    const createdUser = makeRepositoryUserDTOMock(userModel);

    this.users.push(createdUser);

    return createdUser;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async updateUser(updateUserDTO: UpdateUserDTO): Promise<boolean> {
    const foundUserIndex = this.users.findIndex(
      user => user.email === updateUserDTO.email,
    );

    if (foundUserIndex < 0) return false;

    const updatedUser = {
      ...this.users[foundUserIndex],
      name: updateUserDTO.name || this.users[foundUserIndex].name,
      email: updateUserDTO.email || this.users[foundUserIndex].email,
    };

    this.users[foundUserIndex] = updatedUser;

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async enableUser(id: string): Promise<boolean> {
    const foundUserIndex = this.users.findIndex(user => user.id === id);

    if (foundUserIndex < 0) return false;

    this.users[foundUserIndex].disabled_at = null;
    this.users[foundUserIndex].enable_at = new Date();

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async disableUser(id: string): Promise<boolean> {
    const foundUserIndex = this.users.findIndex(user => user.id === id);

    if (foundUserIndex < 0) return false;

    this.users[foundUserIndex].enable_at = null;
    this.users[foundUserIndex].disabled_at = new Date();
    return true;
  }
}
