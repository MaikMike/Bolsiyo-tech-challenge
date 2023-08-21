import jwt from 'jsonwebtoken';

export class JwtService {
  static async generateToken(payload: Record<string, string>) {
    const secret = process.env.JWT_SECRET as string;
    const expiresIn = process.env.JWT_EXPIRES_IN as string;

    return jwt.sign(payload, secret, { expiresIn });
  }
}
