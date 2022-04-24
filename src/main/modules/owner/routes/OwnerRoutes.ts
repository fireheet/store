/* eslint-disable @typescript-eslint/require-await */
import { FastifyPluginAsync } from 'fastify';
import { FastifyRouteAdapter } from '@main/modules/shared/adapters';
import { OWNER_HTTP_CONTROLLER } from '@core/owner/config/types';
import { AppContainer } from '@core/shared/config/inversify.config';
import { OwnerHttpController } from '@core/owner/presentation/contracts';
import { CREATE_OWNER_ROUTE } from '../config';

export class OwnerRoutes {
  static #ownerController: OwnerHttpController =
    AppContainer.get<OwnerHttpController>(OWNER_HTTP_CONTROLLER);

  static createOwnerRoute: FastifyPluginAsync = async (
    fastify,
    _opts
  ): Promise<void> => {
    const createRoute = FastifyRouteAdapter.create(this.#ownerController);

    fastify.post(CREATE_OWNER_ROUTE, createRoute);
  };
}
