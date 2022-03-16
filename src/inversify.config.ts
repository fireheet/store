import { Container } from 'inversify';
import { InversifyContainerFactory } from '@config/container';

const AppContainer = new Container();

InversifyContainerFactory(AppContainer);

export { AppContainer };
