import { inject, service } from '@loopback/core';
import {
  Request,
  RestBindings,
  response,
  put,
  requestBody,
} from '@loopback/rest';
import { RequestBodyObject } from '@loopback/rest';
import { LOGIN_REQUEST_BODY, LOGIN_RESPONSE } from './login.openapi';
import { Credentials } from '../dtos/credentials.dto';

import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @service() private authService: AuthService,
  ) {}

  @put('/auth/login')
  @response(200, LOGIN_RESPONSE)
  async login(
    @requestBody(LOGIN_REQUEST_BODY as RequestBodyObject)
    credentials: Credentials,
  ): Promise<{}> {
    const token = await this.authService.login(credentials);
    return {
      data: {
        token,
      },
    };
  }
}
