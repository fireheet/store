import {
  HttpController,
  HttpResponses,
  HttpResponse,
  HttpRequest
} from '@core/shared/presentation';
import { CreateOwner, InputCreateOwnerDTO } from '@core/owner/domain';
import { inject, injectable } from 'inversify';
import { Exception } from '@core/shared/data/contracts/exceptions';

import { CREATE_OWNER } from '../../config/types';
import { OwnerPresenter } from '../presenters/OwnerPresenter';

@injectable()
export class OwnerController implements HttpController {
  constructor(
    @inject(CREATE_OWNER)
    private readonly createOwner: CreateOwner
  ) {}

  async create(request: HttpRequest): Promise<HttpResponse> {
    try {
      const inputDto = request.body as InputCreateOwnerDTO;

      const outputDto = await this.createOwner.create(inputDto);

      return OwnerPresenter.OwnerCreatedResponse(outputDto);
    } catch (err) {
      const error = err as Exception;
      const errorResponse = new HttpResponses<Exception>();
      return errorResponse.error(error);
    }
  }
}
