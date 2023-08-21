import jwt from 'jsonwebtoken';

export class JwtService {
  static async generateToken(payload: Record<string, string>) {
    const secret = process.env.JWT_SECRET as string;
    const expiresIn = process.env.JWT_EXPIRES_IN as string;

    return jwt.sign(payload, secret, { expiresIn });
  }

  static async verify(token: string) {
    const secret = process.env.JWT_SECRET as string;
    return jwt.verify(token, secret);
  }
}
