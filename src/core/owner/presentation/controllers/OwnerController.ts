import {
  HttpController,
  HttpResponse,
  HttpRequest,
  ErrorResponse
} from '@core/shared/presentation';
import { CreateOwner, InputCreateOwnerDTO } from '@core/owner/domain';
import { inject, injectable } from 'inversify';
import { Exception } from '@core/shared/data/contracts/exceptions';

import { CREATE_OWNER } from '@core/owner/config/types';
import { OwnerPresenter } from '../presenters/OwnerPresenter';
import { OwnerViewModel } from '../views';

@injectable()
export class OwnerController
  implements HttpController<OwnerViewModel | Exception>
{
  constructor(
    @inject(CREATE_OWNER)
    private readonly createOwner: CreateOwner
  ) {}

  async create(
    request: HttpRequest
  ): Promise<HttpResponse<OwnerViewModel | Exception>> {
    try {
      const inputDto = request.body as InputCreateOwnerDTO;

      const outputDto = await this.createOwner.create(inputDto);

      return OwnerPresenter.ownerCreatedResponse(outputDto);
    } catch (err) {
      const error = err as Exception;

      return ErrorResponse(error);
    }
  }
}
