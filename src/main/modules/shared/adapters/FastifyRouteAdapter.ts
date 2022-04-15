import { FastifyReply, FastifyRequest } from 'fastify';
import {
  HttpController,
  InternalServerError
} from '@core/shared/presentation/contracts';

export class FastifyRouteAdapter {
  static create(controller: HttpController) {
    return async (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> => {
      if (!controller?.create) {
        return reply
          .code(InternalServerError.statusCode)
          .send(InternalServerError.data);
      }

      const response = await controller.create(request);

      return reply.status(response.statusCode).send(response.data);
    };
  }

  static update(controller: HttpController) {
    return async (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> => {
      if (!controller?.update) {
        return reply
          .code(InternalServerError.statusCode)
          .send(InternalServerError.data);
      }

      const response = await controller.update(request);

      return reply.status(response.statusCode).send(response.data);
    };
  }

  static delete(controller: HttpController) {
    return async (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> => {
      if (!controller?.delete) {
        return reply
          .code(InternalServerError.statusCode)
          .send(InternalServerError.data);
      }

      const response = await controller.delete(request);

      return reply.status(response.statusCode).send(response.data);
    };
  }

  static index(controller: HttpController) {
    return async (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> => {
      if (!controller?.index) {
        return reply
          .code(InternalServerError.statusCode)
          .send(InternalServerError.data);
      }

      const response = await controller.index(request);

      return reply.status(response.statusCode).send(response.data);
    };
  }

  static show(controller: HttpController) {
    return async (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<FastifyReply> => {
      if (!controller?.show) {
        return reply
          .code(InternalServerError.statusCode)
          .send(InternalServerError.data);
      }

      const response = await controller.show(request);

      return reply.status(response.statusCode).send(response.data);
    };
  }
}
