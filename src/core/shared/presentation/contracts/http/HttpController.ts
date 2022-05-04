import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

export interface HttpController<T = unknown> {
  create?(request: HttpRequest): Promise<HttpResponse<T>>;
  update?(request: HttpRequest): Promise<HttpResponse<T>>;
  delete?(request: HttpRequest): Promise<HttpResponse>;
  index?(request: HttpRequest): Promise<HttpResponse<T[]>>;
  show?(request: HttpRequest): Promise<HttpResponse<T>>;
}
