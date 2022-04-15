import { Container } from 'inversify';

import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts/repositories';
import {
  CreateOwnerService,
  DisableOwnerService,
  EnableOwnerService,
  ShowOwnerService,
  UpdateOwnerService
} from '@core/owner/data/services';
import {
  CreateOwner,
  DisableOwner,
  EnableOwner,
  ShowOwner,
  UpdateOwner
} from '@core/owner/domain/usecases';
import {
  FakeOwnerReadRepository,
  FakeOwnerWriteRepository
} from '@core/owner/infra/repositories';
import {
  CREATE_OWNER,
  UPDATE_OWNER,
  OWNER_READ_REPOSITORY,
  OWNER_WRITE_REPOSITORY,
  SHOW_OWNER,
  ENABLE_OWNER,
  DISABLE_OWNER,
  OWNER_HTTP_CONTROLLER
} from '@core/owner/config/types';
import { HttpController } from '@core/shared/presentation/contracts';
import { OwnerHttpControllerImplementation } from '@core/owner/presentation/controllers';
import { OwnerViewModel } from '@core/owner/presentation/views';
import { Exception } from '@core/shared/data/contracts/exceptions';

export class OwnerContainer {
  static bindTo(container: Container): void {
    container.bind<CreateOwner>(CREATE_OWNER).to(CreateOwnerService);
    container.bind<UpdateOwner>(UPDATE_OWNER).to(UpdateOwnerService);
    container.bind<ShowOwner>(SHOW_OWNER).to(ShowOwnerService);
    container.bind<EnableOwner>(ENABLE_OWNER).to(EnableOwnerService);
    container.bind<DisableOwner>(DISABLE_OWNER).to(DisableOwnerService);

    container
      .bind<OwnerReadRepository>(OWNER_READ_REPOSITORY)
      .to(FakeOwnerReadRepository);

    container
      .bind<OwnerWriteRepository>(OWNER_WRITE_REPOSITORY)
      .to(FakeOwnerWriteRepository);

    container
      .bind<HttpController<OwnerViewModel | Exception>>(OWNER_HTTP_CONTROLLER)
      .to(OwnerHttpControllerImplementation);
  }
}
