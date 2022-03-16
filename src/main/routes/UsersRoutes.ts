import { FastifyPluginAsync } from 'fastify';
import { FastifyRouteAdapter } from '@main/adapters';
import { makeUsersControllerFactory } from '@main/factories';

const UsersRoutes: FastifyPluginAsync = async (
  fastify,
  _opts
): Promise<void> => {
  const controller = makeUsersControllerFactory();

  const createRoute = FastifyRouteAdapter.create(controller);

  fastify.post('/', createRoute);
};

export default UsersRoutes;
