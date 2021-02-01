import { RouteOptions, Server } from "@hapi/hapi";

import { customerPlugin } from "./routes/customer";
import { agreementPlugin } from "./routes/agreement";
import { servicePlugin } from "./routes/service";

const good = require("@hapi/good");

export async function run() {
  const server = new Server({
    port: process.env.PORT || 3001,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
        credentials: true,
      },
    },
  });

  await server.register([
    {
      plugin: good,
      options: {
        reporters: {
          consoleReporter: [
            {
              module: "@hapi/good-squeeze",
              name: "Squeeze",
              args: [
                {
                  request: "*",
                  log: "*",
                  error: "*",
                  response: { exclude: "no_log" },
                },
              ],
            },
            {
              module: "@hapi/good-console",
            },
            "stdout",
          ],
        },
      },
    },
  ]);

  const routeOptions: RouteOptions = { json: { space: 2 } };

  await server.register({
    plugin: customerPlugin,
    options: { routeOptions },
  });
  await server.register({
    plugin: agreementPlugin,
    options: { routeOptions },
  });
  await server.register({
    plugin: servicePlugin,
    options: { routeOptions },
  });

  await server.start();
  // tslint:disable-next-line:no-console
  console.log(`Server online: ${server.info.uri}`);

  return server;
}
