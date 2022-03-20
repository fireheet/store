import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyContainerFactory } from './container/InversifyContainerFactory';

const AppContainer = new Container();

InversifyContainerFactory(AppContainer);

export { AppContainer };
