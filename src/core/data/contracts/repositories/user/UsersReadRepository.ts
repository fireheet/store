import { RepositoryUserDTO } from '@data/dtos/user';

export interface UsersReadRepository {
  storeUser(user: RepositoryUserDTO): Promise<void>;
  removeUser(id: string): Promise<void>;
  findUserByID(id: string): Promise<RepositoryUserDTO | undefined>;
  findUserByEmail(email: string): Promise<RepositoryUserDTO | undefined>;
  findUserByDocumentNumber(
    documentNumber: string,
  ): Promise<RepositoryUserDTO | undefined>;
}
