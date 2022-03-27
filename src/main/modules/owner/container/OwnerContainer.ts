import { Container } from 'inversify';

import { OwnerReadRepository } from '@core/owner/data/contracts/repositories';
import { CreateOwnerService } from '@core/owner/data/services';
import { CreateOwner } from '@core/owner/domain/usecases';
import { FakeOwnerReadRepository } from '@core/owner/infra/repositories';
import { CREATE_OWNER, OWNER_READ_REPOSITORY } from '@core/owner/config/types';

export class OwnerContainer {
  static bindTo(container: Container): void {
    container.bind<CreateOwner>(CREATE_OWNER).to(CreateOwnerService);

    container
      .bind<OwnerReadRepository>(OWNER_READ_REPOSITORY)
      .to(FakeOwnerReadRepository);
  }
}
