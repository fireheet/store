import {
  HttpResponse,
  HttpResponses
} from '@core/shared/presentation/contracts';
import {
  OutputCreateOwnerDTO,
  OutputShowOwnerDTO
} from '@core/owner/domain/dtos';
import { OwnerViewModel } from '../views';
import { OutputUpdateOwnerDTO } from '../../domain/dtos/update-owner/OutputUpdateOwnerDTO';

const kHttpResponseOk = Symbol.for('okResponse');

export class OwnerPresenter {
  private static ownerHttpResponses = new HttpResponses<OwnerViewModel>();

  static ownerCreatedResponse(
    outputDTO: OutputCreateOwnerDTO
  ): HttpResponse<OwnerViewModel> {
    const viewModel: OwnerViewModel = {
      id: outputDTO.id,
      name: outputDTO.name
    };

    return this.ownerHttpResponses.created(viewModel);
  }

  static ownerUpdatedResponse(
    outputDTO: OutputUpdateOwnerDTO
  ): HttpResponse<OwnerViewModel> {
    return this[kHttpResponseOk](outputDTO);
  }

  static ownerShowedResponse(
    outputDTO: OutputShowOwnerDTO
  ): HttpResponse<OwnerViewModel> {
    return this[kHttpResponseOk](outputDTO);
  }

  static [kHttpResponseOk](
    outputDTO: OwnerViewModel
  ): HttpResponse<OwnerViewModel> {
    const viewModel: OwnerViewModel = { ...outputDTO };

    return this.ownerHttpResponses.ok(viewModel);
  }
}
