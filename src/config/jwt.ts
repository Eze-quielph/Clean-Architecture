import jwt, { JwtPayload } from "jsonwebtoken";
import { envs } from "./envs";

//Para la sed podes usar el comando: openssl rand -hex 32
const JWT_SEED = envs.JWT_SEED;

export class Jwt {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    // Jwt no trabaja con promesas, si no que con callbacks, para agilizar su trabajo se puede usar promisify
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token!);
      });
    });
  }

  static async verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
