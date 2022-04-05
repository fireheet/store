import { HttpResponse, HttpResponses } from '@core/shared/presentation';
import { OutputCreateOwnerDTO } from '@core/owner/domain/dtos';
import { OwnerViewModel } from '../views';

export class OwnerPresenter {
  static OwnerCreatedResponse(
    outputDTO: OutputCreateOwnerDTO
  ): HttpResponse<OwnerViewModel> {
    const viewModel = new OwnerViewModel(outputDTO);

    const response = new HttpResponses<OwnerViewModel>();

    return response.created(viewModel);
  }
}
