import { HttpResponse, HttpResponses } from '@core/shared/presentation';
import { OutputCreateOwnerDTO } from '@core/owner/domain/dtos';
import { OwnerViewModel } from '../views';

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
}
