import { HttpController } from '@core/presentation/contracts';
import { UsersController } from '@core/presentation/controllers';
import { CreateUserService } from '@core/data/services';
import { FakeUsersRepository } from '@core/infra/repositories';

export const makeUsersControllerFactory = (): HttpController => {
  const usersRepository = new FakeUsersRepository();
  const createUser = new CreateUserService(usersRepository);

  return new UsersController(createUser);
};
