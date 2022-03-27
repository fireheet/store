/* eslint-disable @typescript-eslint/require-await */
import { FastifyPluginAsync } from 'fastify';
import { FastifyRouteAdapter } from '@main/modules/shared/adapters';
import { OwnerController } from '@core/owner/presentation';
import { inject, injectable } from 'inversify';
import { OwnerTypes } from '@core/owner/config/types';
import { OwnerRouteStrings } from '../config';

@injectable()
export class OwnerRoutes {
  constructor(
    @inject(OwnerTypes.OwnerController)
    private readonly ownerController: OwnerController
  ) {}

  createOwnerRoute: FastifyPluginAsync = async (
    fastify,
    _opts
  ): Promise<void> => {
    const createRoute = FastifyRouteAdapter.create(this.ownerController);
    fastify.post(OwnerRouteStrings.CREATE_OWNER, createRoute);
  };
}
