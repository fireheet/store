import { HttpResponse } from './HttpResponse';

// TODO Create HttpParams to substitute the body parameter

export interface HttpController {
  create(body: unknown): Promise<HttpResponse>;
}
