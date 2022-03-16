import { Container } from 'inversify';

import { OwnerContainerFactory } from './domain/OwnerContainerFactory';

export function InversifyContainerFactory(container: Container) {
  OwnerContainerFactory.bind(container);
}
