import 'reflect-metadata';
import { Container } from 'inversify';
import { OwnerContainer } from '@core/owner/config/container';

const AppContainer = new Container();

OwnerContainer.bindTo(AppContainer);

export { AppContainer };
