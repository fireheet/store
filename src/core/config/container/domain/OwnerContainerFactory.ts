import { Container } from 'inversify';

import { CreateOwnerService } from '@data/services/owner';
import { CreateOwner } from '@domain/owner/usecases';
import { OwnerTypes } from '@config/container/types';
import { OwnersReadRepository } from '@data/contracts/repositories';
import { FakeOwnersReadRepository } from '@infra/repositories';

export class OwnerContainerFactory {
  static bind(container: Container): void {
    container.bind<CreateOwner>(OwnerTypes.CreateOwner).to(CreateOwnerService);

    container
      .bind<OwnersReadRepository>(OwnerTypes.OwnerReadRepository)
      .to(FakeOwnersReadRepository);
  }
}
