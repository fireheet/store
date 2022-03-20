import 'reflect-metadata';
import { Container } from 'inversify';
import { OwnerContainer } from '@main/modules/owner/container';

const AppContainer = new Container();

OwnerContainer.bindTo(AppContainer);

export { AppContainer };
