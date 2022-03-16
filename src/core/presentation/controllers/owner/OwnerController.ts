import {
  HttpController,
  HttpResponses,
  HttpResponse
} from '@presentation/contracts/http';
import { CreateOwner } from '@domain/usecases/owner';
import { OwnerViewModel } from '@presentation/views';

export class UsersController implements HttpController {
  constructor(private readonly createOwner: CreateOwner) {}

  async create(body: any): Promise<HttpResponse<OwnerViewModel>> {
    const createdOwner = await this.createOwner.create(body);

    const response = new HttpResponses<OwnerViewModel>();

    return response.httpCreated(createdOwner);
  }
}
