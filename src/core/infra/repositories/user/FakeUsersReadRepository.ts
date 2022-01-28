/* eslint-disable @typescript-eslint/require-await */
import { RepositoryUserDTO } from '@data/dtos/user';
import { UsersReadRepository } from '@data/contracts/repositories';

export class FakeUsersReadRepository implements UsersReadRepository {
  users: RepositoryUserDTO[] = [];

  async storeUser(user: RepositoryUserDTO): Promise<void> {
    this.users.push(user);
  }

  async removeUser(id: string): Promise<void> {
    this.users = this.users.filter(existingUser => existingUser.id !== id);
  }

  async findUserByID(id: string): Promise<RepositoryUserDTO | undefined> {
    const foundUserIndex = this.users.findIndex(user => user.id === id);

    if (foundUserIndex < 0) return undefined;

    return this.users[foundUserIndex];
  }

  async findUserByEmail(email: string): Promise<RepositoryUserDTO | undefined> {
    const foundUserIndex = this.users.findIndex(user => user.email === email);

    if (foundUserIndex < 0) return undefined;

    return this.users[foundUserIndex];
  }

  async findUserByDocumentNumber(
    documentNumber: string,
  ): Promise<RepositoryUserDTO | undefined> {
    const foundUserIndex = this.users.findIndex(
      user => user.documentNumber === documentNumber,
    );

    if (foundUserIndex < 0) return undefined;

    return this.users[foundUserIndex];
  }
}
