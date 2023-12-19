import { NextFunction, Request, Response } from "express";
import { Jwt } from "../../config";
import { User } from "../../data/mongodb";

export class AuthMiddleware {
  static async validateJwt(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization)
      return res.status(401).json({ error: "No Token Provider" });

    if (!authorization.startsWith("Bearer"))
      return res.status(401).json({ error: "Invalid Bearer Token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await Jwt.verifyToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid Token" });

      const user = await User.findById(payload.id);
      if (!user) return res.status(401).json({ error: "User Not Found" });

      req.body.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
