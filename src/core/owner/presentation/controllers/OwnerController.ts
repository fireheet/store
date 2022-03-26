import {
  HttpController,
  HttpResponses,
  HttpResponse,
  HttpRequest
} from '@core/shared/presentation';
import { CreateOwner } from '@core/owner/domain';
import { inject, injectable } from 'inversify';
import { OwnerTypes } from '@core/owner/config/types';
import { HttpConstants } from '@core/shared/config';
import { Exception } from '@core/shared/data/contracts/exceptions';
import { OwnerViewModel } from '../views';

@injectable()
export class OwnerController implements HttpController {
  constructor(
    @inject(OwnerTypes.CreateOwner) private readonly createOwner: CreateOwner
  ) {}

  async create(request: HttpRequest): Promise<HttpResponse> {
    try {
      const createdOwner = await this.createOwner.create(request.body);

      const viewModel = new OwnerViewModel(createdOwner);

      const response = new HttpResponses<OwnerViewModel>();

      return response.created(viewModel);
    } catch (err) {
      const error = err as Exception;
      const errorResponse = new HttpResponses<Exception>();
      return errorResponse.error(error, HttpConstants.BAD_REQUEST);
    }
  }
}
