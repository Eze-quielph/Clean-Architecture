import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  // info: Para evitar usar DI, se puede usar un método estático
  static get routes(): Router {
    const router = Router();

    // todo: Definir rutas principales
    router.use("/api/auth", AuthRoutes.routes );
    /*   router.use('/api/users')
    router.use('/api/prodcuts')
    router.use('/api/clients')
    router.use('/api/orders') */

    return router;
  }
}
