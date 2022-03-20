import {
  HttpController,
  HttpResponses,
  HttpResponse
} from '@core/shared/presentation';
import { CreateOwner } from '@core/owner/domain';
import { OwnerViewModel } from '../views';

export class UsersController implements HttpController {
  constructor(private readonly createOwner: CreateOwner) {}

  async create(body: any): Promise<HttpResponse<OwnerViewModel>> {
    const createdOwner = await this.createOwner.create(body);

    const response = new HttpResponses<OwnerViewModel>();

    return response.httpCreated(createdOwner);
  }
}
