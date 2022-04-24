import { Container } from 'inversify';

import {
  OwnerReadRepository,
  OwnerWriteRepository
} from '@core/owner/data/contracts/repositories';
import {
  CreateOwnerUseCase,
  DisableOwnerUseCase,
  EnableOwnerUseCase,
  ShowOwnerUseCase,
  UpdateOwnerUseCase
} from '@core/owner/data/usecases';
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
import { OwnerHttpControllerImplementation } from '@core/owner/presentation/controllers';
import { OwnerHttpController } from '@core/owner/presentation/contracts';

export class OwnerContainer {
  static bindTo(container: Container): void {
    container.bind<CreateOwner>(CREATE_OWNER).to(CreateOwnerUseCase);
    container.bind<UpdateOwner>(UPDATE_OWNER).to(UpdateOwnerUseCase);
    container.bind<ShowOwner>(SHOW_OWNER).to(ShowOwnerUseCase);
    container.bind<EnableOwner>(ENABLE_OWNER).to(EnableOwnerUseCase);
    container.bind<DisableOwner>(DISABLE_OWNER).to(DisableOwnerUseCase);

    container
      .bind<OwnerReadRepository>(OWNER_READ_REPOSITORY)
      .to(FakeOwnerReadRepository);

    container
      .bind<OwnerWriteRepository>(OWNER_WRITE_REPOSITORY)
      .to(FakeOwnerWriteRepository);

    container
      .bind<OwnerHttpController>(OWNER_HTTP_CONTROLLER)
      .to(OwnerHttpControllerImplementation);
  }
}
