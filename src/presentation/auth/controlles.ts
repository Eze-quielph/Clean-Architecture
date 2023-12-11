import { Request, Response } from "express";
import { AuthRepository, RegisterUserDto } from "../../domain";

export class AuthController {
  //DI
  constructor(
    private readonly authRepositories: AuthRepository
  ) {}

  //La documentacion de express recomienda que los controladores sean funciones puras o en otras palabras que no sean asincronas
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authRepositories.register(registerUserDto!)
      .then(user => res.json(user))
      .catch(error => res.status(400).json({ error }));
  };

  loginUser = (req: Request, res: Response) => {
    res.json("Login");
  };
}
