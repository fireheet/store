import {
  HttpController,
  HttpResponses,
  HttpResponse
} from '@core/shared/presentation';
import { CreateOwner } from '@core/owner/domain';
import { inject, injectable } from 'inversify';
import { OwnerTypes } from '@core/owner/config/types';
import { OwnerViewModel } from '../views';

@injectable()
export class OwnerController implements HttpController {
  constructor(
    @inject(OwnerTypes.CreateOwner) private readonly createOwner: CreateOwner
  ) {}

  async create(body: any): Promise<HttpResponse<OwnerViewModel>> {
    const createdOwner = await this.createOwner.create(body);

    const response = new HttpResponses<OwnerViewModel>();

    return response.httpCreated(createdOwner);
  }
}
