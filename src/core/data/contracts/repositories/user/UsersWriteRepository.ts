import {
  CreateUserDTO,
  RepositoryUserDTO,
  UpdateUserDTO,
} from '@data/dtos/user';

export interface UsersWriteRepository {
  writeUser(createUserDTO: CreateUserDTO): Promise<RepositoryUserDTO>;
  updateUser(updateUserDTO: UpdateUserDTO): Promise<boolean>;
  enableUser(id: string): Promise<boolean>;
  disableUser(id: string): Promise<boolean>;
}
