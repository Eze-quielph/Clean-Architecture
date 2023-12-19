import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { Jwt } from "../../config";
import { User } from "../../data/mongodb";
import { RegisterUser } from "../../domain/use-case";

export class AuthController {
  //DI
  constructor(private readonly authRepositories: AuthRepository) {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.warn(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  //La documentacion de express recomienda que los controladores sean funciones puras o en otras palabras que no sean asincronas
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    if (!registerUserDto) throw CustomError.internal("Internal Server Error");
    else {
      new RegisterUser(this.authRepositories)
        .execute(registerUserDto)
        .then((userToken) => res.json(userToken))
        .catch((error) => this.handleError(error, res));
    }
  };

  loginUser = (req: Request, res: Response) => {
    res.json("Login");
  };

  getUsers = (req: Request, resp: Response) => {
    User.find()
      .then((users) =>
        resp.json({
          users,
          user: req.body.user,
        })
      )
      .catch((error) => this.handleError(error, resp));
  };
}
