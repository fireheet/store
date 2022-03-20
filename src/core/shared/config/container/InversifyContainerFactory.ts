import { Container } from 'inversify';
import { OwnerContainerFactory } from '@core/owner/config/container/OwnerContainerFactory';

export function InversifyContainerFactory(container: Container) {
  OwnerContainerFactory.bind(container);
}
