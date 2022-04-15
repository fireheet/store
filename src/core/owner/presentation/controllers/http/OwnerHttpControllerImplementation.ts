import {
  HttpResponse,
  HttpRequest,
  ErrorResponse
} from '@core/shared/presentation/contracts';
import {
  InputCreateOwnerDTO,
  InputShowOwnerDTO,
  InputUpdateOwnerDTO
} from '@core/owner/domain/dtos';
import { inject, injectable } from 'inversify';
import { Exception } from '@core/shared/data/contracts/exceptions';

import {
  CREATE_OWNER,
  SHOW_OWNER,
  UPDATE_OWNER
} from '@core/owner/config/types';
import {
  CreateOwner,
  ShowOwner,
  UpdateOwner
} from '@core/owner/domain/usecases';
import { OwnerPresenter } from '../../presenters/OwnerPresenter';
import { OwnerViewModel } from '../../views';
import { OwnerHttpController } from '../../contracts';

type ResponseType = HttpResponse<OwnerViewModel | Exception>;

@injectable()
export class OwnerHttpControllerImplementation implements OwnerHttpController {
  constructor(
    @inject(CREATE_OWNER)
    private readonly createOwner: CreateOwner,
    @inject(UPDATE_OWNER)
    private readonly updateOwner: UpdateOwner,
    @inject(SHOW_OWNER)
    private readonly showOwner: ShowOwner
  ) {}

  async create(request: HttpRequest): Promise<ResponseType> {
    try {
      const inputDto = request.body as InputCreateOwnerDTO;

      const outputDto = await this.createOwner.create(inputDto);

      return OwnerPresenter.ownerCreatedResponse(outputDto);
    } catch (err) {
      const error = err as Exception;

      return ErrorResponse(error);
    }
  }

  async update(request: HttpRequest): Promise<ResponseType> {
    try {
      const inputDto = request.body as InputUpdateOwnerDTO;

      const outputDto = await this.updateOwner.update(inputDto);

      return OwnerPresenter.ownerUpdatedResponse(outputDto);
    } catch (err) {
      const error = err as Exception;

      return ErrorResponse(error);
    }
  }

  async show(request: HttpRequest): Promise<ResponseType> {
    try {
      const inputDto = request.body as InputShowOwnerDTO;

      const outputDto = await this.showOwner.show(inputDto);

      return OwnerPresenter.ownerShowedResponse(outputDto);
    } catch (err) {
      const error = err as Exception;

      return ErrorResponse(error);
    }
  }
}