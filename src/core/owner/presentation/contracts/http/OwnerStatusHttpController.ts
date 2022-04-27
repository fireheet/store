import {
  HttpController,
  HttpResponse
} from '@core/shared/presentation/contracts';
import { Exception } from '@core/shared/data/contracts/exceptions';

export type OwnerStatusHttpControllerResponse = HttpResponse<
  string | Exception
>;

export type OwnerStatusHttpController = HttpController<string | Exception>;
