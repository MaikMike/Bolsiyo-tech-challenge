import { inject } from '@loopback/core';
import { Request, RestBindings, get, response } from '@loopback/rest';
import { PING_RESPONSE } from './ping.openapi';

export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/ping')
  @response(200, PING_RESPONSE)
  ping(): object {
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
