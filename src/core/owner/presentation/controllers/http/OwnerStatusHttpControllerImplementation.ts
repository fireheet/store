import {
  HttpRequest,
  ErrorResponse
} from '@core/shared/presentation/contracts';
import {
  InputDisableOwnerDTO,
  InputEnableOwnerDTO
} from '@core/owner/domain/dtos';
import { inject, injectable } from 'inversify';
import { Exception } from '@core/shared/data/contracts/exceptions';

import { DISABLE_OWNER, ENABLE_OWNER } from '@core/owner/config/types';
import { DisableOwner, EnableOwner } from '@core/owner/domain/usecases';
import { OwnerHttpPresenter } from '@core/owner/presentation/presenters';
import {
  OwnerStatusHttpController,
  OwnerStatusHttpControllerResponse
} from '@core/owner/presentation/contracts';

@injectable()
export class OwnerStatusHttpControllerImplementation
  implements OwnerStatusHttpController
{
  constructor(
    @inject(ENABLE_OWNER)
    private readonly enableOwner: EnableOwner,
    @inject(DISABLE_OWNER)
    private readonly disableOwner: DisableOwner
  ) {}

  async update({
    body
  }: HttpRequest): Promise<OwnerStatusHttpControllerResponse> {
    try {
      const { id } = body as InputEnableOwnerDTO;

      await this.enableOwner.enable({ id });

      return OwnerHttpPresenter.enableResponse(id);
    } catch (err) {
      const error = err as Exception;

      return ErrorResponse(error);
    }
  }

  async delete({
    body
  }: HttpRequest): Promise<OwnerStatusHttpControllerResponse> {
    try {
      const { id } = body as InputDisableOwnerDTO;

      await this.disableOwner.disable({ id });

      return OwnerHttpPresenter.disableResponse(id);
    } catch (err) {
      const error = err as Exception;

      return ErrorResponse(error);
    }
  }
}
