import { Container } from 'inversify';

import { OwnerReadRepository } from '@core/owner/data/contracts/repositories';
import { CreateOwnerService } from '@core/owner/data/services';
import { CreateOwner } from '@core/owner/domain/usecases';
import { FakeOwnerReadRepository } from '@core/owner/infra/repositories';
import { OwnerTypes } from '@core/owner/config/types';

export class OwnerContainer {
  static bindTo(container: Container): void {
    container.bind<CreateOwner>(OwnerTypes.CreateOwner).to(CreateOwnerService);

    container
      .bind<OwnerReadRepository>(OwnerTypes.OwnerReadRepository)
      .to(FakeOwnerReadRepository);
  }
}
