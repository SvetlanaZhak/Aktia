import { Plugin, RouteOptions } from "@hapi/hapi";
import { handleDeleteService } from "./handlers/delete-service";
import { handleGetServices, handleGetService } from "./handlers/get-services";
import { handlePostService } from "./handlers/post-service";
import { handlePutService } from "./handlers/put-service";

interface PluginOptions {
  routeOptions: RouteOptions;
}

export const servicePlugin: Plugin<PluginOptions> = {
  name: "service-plugin",
  version: "1.0.0",
  register: async (server, { routeOptions }) => {
    server.route({
      method: "GET",
      path: "/api/services",
      handler: handleGetServices,
    });
    server.route({
      method: "GET",
      path: "/api/service/{id}",
      handler: handleGetService,
      options: routeOptions,
    });
    server.route({
      method: "POST",
      path: "/api/service",
      handler: handlePostService,
      options: routeOptions,
    });
    server.route({
      method: "PUT",
      path: "/api/service/{id}",
      handler: handlePutService,
      options: routeOptions,
    });
    server.route({
      method: "DELETE",
      path: "/api/service/{id}",
      handler: handleDeleteService,
    });
  },
};
