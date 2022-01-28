import { FastifyPluginAsync } from 'fastify';
import { FastifyRouteAdapter } from '@main/adapters';
import { makeUsersControllerFactory } from '@main/factories';

const UsersRoutes: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  fastify.post('/', FastifyRouteAdapter.create(makeUsersControllerFactory()));
};

export default UsersRoutes;
