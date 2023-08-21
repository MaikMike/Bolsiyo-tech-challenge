import * as bcrypt from 'bcryptjs';
import { error } from 'console';

import { injectable, service } from '@loopback/core';
import { Logger } from '../../shared/logger/logger';
import { Credentials } from '../dtos/credentials.dto';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { UserFoundError } from '../errors/user-not-found.error';
import { UserRepository } from '../repositories/user.repository';

import { JwtService } from '../services/jwt.service';

@injectable()
export class AuthService {
  constructor(
    @service() private logger: Logger,
    @service() private userRepository: UserRepository,
  ) {}

  async login({ email, password }: Credentials): Promise<string> {
    this.logger.info({ message: `Login attempt for user: ${email}` });
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserFoundError();
    }

    const passwordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new InvalidCredentialsError();
    }

    return JwtService.generateToken({ email: user.email, companyId: user.companyId });
  }
}
