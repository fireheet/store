import {
  HttpController,
  HttpCreated,
  HttpResponse,
} from '@presentation/contracts/http';
import { CreateUser } from '@domain/usecases/user';
import { UserViewModel } from '@presentation/views/user';

export class UsersController implements HttpController {
  constructor(private readonly createUser: CreateUser) {}

  async create(body: any): Promise<HttpResponse<UserViewModel>> {
    const createdUser = await this.createUser.create(body);

    return HttpCreated(UserViewModel.map(createdUser));
  }
}
