import { HttpResponse } from './HttpResponse';

export interface HttpController {
  create(body: unknown): Promise<HttpResponse>;
}
