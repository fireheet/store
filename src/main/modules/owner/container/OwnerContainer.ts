import { Container } from 'inversify';

import { OwnersReadRepository } from '@core/owner/data/contracts/repositories';
import { CreateOwnerService } from '@core/owner/data/services';
import { CreateOwner } from '@core/owner/domain/usecases';
import { FakeOwnersReadRepository } from '@core/owner/infra/repositories';
import { OwnerTypes } from '@core/owner/config/types';

export class OwnerContainer {
  static bindTo(container: Container): void {
    container.bind<CreateOwner>(OwnerTypes.CreateOwner).to(CreateOwnerService);

    container
      .bind<OwnersReadRepository>(OwnerTypes.OwnerReadRepository)
      .to(FakeOwnersReadRepository);
  }
}
