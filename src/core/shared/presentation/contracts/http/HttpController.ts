import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

export interface HttpController {
  create(request: HttpRequest): Promise<HttpResponse>;
}
