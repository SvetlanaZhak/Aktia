import { Plugin, RouteOptions } from '@hapi/hapi';
import { handleDeleteCustomer } from './handlers/delete-customer';
import { handleGetCustomers, handleGetCustomer } from './handlers/get-customers';
import { handlePostCustomer } from './handlers/post-customer';
import { handlePutCustomer } from './handlers/put-customer';

interface PluginOptions {
  routeOptions: RouteOptions;
}

export const customerPlugin: Plugin<PluginOptions> = {
  name: 'customer-plugin',
  version: '1.0.0',
  register: async (server, { routeOptions }) => {
    server.route({
      method: 'GET',
      path: '/api/customers',
      handler: handleGetCustomers,
    });
    server.route({
      method: 'GET',
      path: '/api/customer/{id}',
      handler: handleGetCustomer,
      options: routeOptions,
    });
    server.route({
      method: 'POST',
      path: '/api/customer',
      handler: handlePostCustomer,
      options: routeOptions,
    });
    server.route({
      method: 'PUT',
      path: '/api/customer/{id}',
      handler: handlePutCustomer,
      options: routeOptions,
    });
    server.route({
      method: 'DELETE',
      path: '/api/customer/{id}',
      handler: handleDeleteCustomer,
    });
  },
};
