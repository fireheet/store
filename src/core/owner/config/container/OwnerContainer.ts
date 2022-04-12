import { Container } from 'inversify';

import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts/repositories';
import { CreateOwnerService } from '@core/owner/data/services';
import { CreateOwner } from '@core/owner/domain/usecases';
import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import {
  CREATE_OWNER,
  OWNER_CONTROLLER,
  OWNER_READ_REPOSITORY,
  OWNER_WRITE_REPOSITORY
} from '@core/owner/config/types';
import { OwnerController } from '@core/owner/presentation/controllers';
import { HttpController } from '@core/shared/presentation';
import { Exception } from '@core/shared/data';
import { OwnerViewModel } from '@core/owner/presentation';

export class OwnerContainer {
  static bindTo(container: Container): void {
    container.bind<CreateOwner>(CREATE_OWNER).to(CreateOwnerService);

    container
      .bind<OwnerReadRepository>(OWNER_READ_REPOSITORY)
      .to(FakeOwnerReadRepository);

    container
      .bind<OwnerWriteRepository>(OWNER_WRITE_REPOSITORY)
      .to(FakeOwnerWriteRepository);

    container
      .bind<HttpController<OwnerViewModel | Exception>>(OWNER_CONTROLLER)
      .to(OwnerController);
  }
}
