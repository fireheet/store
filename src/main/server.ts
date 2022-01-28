/* eslint-disable no-void */
import 'module-alias/register';
import { join } from 'path';
import cors from 'fastify-cors';
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

export type AppOptions = { logger: true } & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify: FastifyInstance,
  opts: Partial<AutoloadPluginOptions>,
): Promise<void> => {
  void fastify.register(cors);

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'infra/fastify/plugins'),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};

export default app;
export { app };
