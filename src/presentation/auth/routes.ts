import { Router } from "express";
import { AuthController } from "./controlles";
import {
  AuthDatasourceImpl,
  AuthRepositoriesIimpl,
} from "../../infrastructure/index";
import { AuthMiddleware } from "../middlewares";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepositoriesIimpl = new AuthRepositoriesIimpl(datasource);
    const controller = new AuthController(authRepositoriesIimpl);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/", [AuthMiddleware.validateJwt], controller.getUsers);

    return router;
  }
}
