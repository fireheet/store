import { HttpController } from '@core/shared/presentation/contracts';
import { Exception } from '@core/shared/data/contracts/exceptions';
import { OwnerViewModel } from '@core/owner/presentation/views';

export type OwnerHttpController = HttpController<OwnerViewModel | Exception>;
