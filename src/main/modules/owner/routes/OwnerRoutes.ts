/* eslint-disable @typescript-eslint/require-await */
import { FastifyPluginAsync } from 'fastify';
import { FastifyRouteAdapter } from '@main/modules/shared/adapters';
import { OwnerViewModel } from '@core/owner/presentation';
import { OWNER_CONTROLLER } from '@core/owner/config/types';
import { AppContainer } from '@core/shared/config/inversify.config';
import { CREATE_OWNER_ROUTE } from '../config';
import { HttpController } from '../../../../core/shared/presentation';
import { Exception } from '../../../../core/shared/data';

export class OwnerRoutes {
  static createOwnerRoute: FastifyPluginAsync = async (
    fastify,
    _opts
  ): Promise<void> => {
    const ownerController =
      AppContainer.get<HttpController<OwnerViewModel | Exception>>(
        OWNER_CONTROLLER
      );

    const createRoute = FastifyRouteAdapter.create(ownerController);

    fastify.post(CREATE_OWNER_ROUTE, createRoute);
  };
}
