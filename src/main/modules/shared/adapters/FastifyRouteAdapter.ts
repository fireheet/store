import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpController } from '@core/shared/presentation/contracts';

export class FastifyRouteAdapter {
  static create(controller: HttpController) {
    return async (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> => {
      const response = await controller.create(request);

      return reply.status(response.statusCode).send(response.data);
    };
  }
}
