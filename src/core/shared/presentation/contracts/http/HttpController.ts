import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

export interface HttpController {
  create?(request: HttpRequest): Promise<HttpResponse>;
  update?(request: HttpRequest): Promise<HttpResponse>;
  delete?(request: HttpRequest): Promise<HttpResponse>;
  index?(request: HttpRequest): Promise<HttpResponse>;
  show?(request: HttpRequest): Promise<HttpResponse>;
}
