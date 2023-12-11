import express, { Router } from "express";

interface Options {
  port?: number;
  routes: Router;
}

// todo: Configuraciones y cambios al servidor se lo pasan por constructor,  Principio de responsabilidad Unica y Open Close Principle
export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    // Routes
    this.app.use(this.routes);

    // Listen on port
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
