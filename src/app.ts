import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  // todo: await database connection

  // todo: await server connection
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  }).start();
}
