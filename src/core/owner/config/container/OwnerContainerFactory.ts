import { Container } from 'inversify';

import { OwnersReadRepository } from '@core/owner/data/contracts/repositories';
import { CreateOwnerService } from '@core/owner/data/services';
import { CreateOwner } from '@core/owner/domain/usecases';
import { FakeOwnersReadRepository } from '@core/owner/infra/repositories';
import { OwnerTypes } from './types';

export class OwnerContainerFactory {
  static bind(container: Container): void {
    container.bind<CreateOwner>(OwnerTypes.CreateOwner).to(CreateOwnerService);

    container
      .bind<OwnersReadRepository>(OwnerTypes.OwnerReadRepository)
      .to(FakeOwnersReadRepository);
  }
}
