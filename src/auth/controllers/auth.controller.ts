import { inject, service } from '@loopback/core';
import { Request, RestBindings, response, put, requestBody } from '@loopback/rest';
import { Credentials } from '../dtos/credentials.dto';

import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @service() private authService: AuthService,
  ) {}

  @put('/auth/login')
  @response(200, {
    description: 'Login',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async login(@requestBody() credentials: Credentials): Promise<{}> {
    const token = await this.authService.login(credentials);
    return {
      data: {
        token,
      }
    };
  }
}
