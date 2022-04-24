import { HttpController } from '@core/shared/presentation/contracts';
import { Exception } from '@core/shared/data/contracts/exceptions';

export type OwnerStatusHttpController = HttpController<string | Exception>;
