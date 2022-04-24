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

  private static ownerStatusHttpResponses = new HttpResponses<string>();

  static createResponse(
    outputDTO: OutputCreateOwnerDTO
  ): HttpResponse<OwnerViewModel> {
    const viewModel: OwnerViewModel = {
      id: outputDTO.id,
      name: outputDTO.name
    };

    return this.ownerHttpResponses.created(viewModel);
  }

  static updateResponse(
    outputDTO: OutputUpdateOwnerDTO
  ): HttpResponse<OwnerViewModel> {
    return this[kHttpResponseOk](outputDTO);
  }

  static showResponse(
    outputDTO: OutputShowOwnerDTO
  ): HttpResponse<OwnerViewModel> {
    return this[kHttpResponseOk](outputDTO);
  }

  static enableResponse(id: string): HttpResponse<string> {
    return this.ownerStatusHttpResponses.ok(`Owner ${id} enabled`);
  }

  static disableResponse(id: string): HttpResponse<string> {
    return this.ownerStatusHttpResponses.ok(`Owner ${id} disabled`);
  }

  static [kHttpResponseOk](
    outputDTO: OwnerViewModel
  ): HttpResponse<OwnerViewModel> {
    const viewModel: OwnerViewModel = { ...outputDTO };

    return this.ownerHttpResponses.ok(viewModel);
  }
}
