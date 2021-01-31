import { Plugin, RouteOptions } from '@hapi/hapi';
import { handleDeleteAgreement } from './handlers/delete-agreement';
import { handleGetAgreements, handleGetAgreement } from './handlers/get-agreements';
import { handlePostAgreement } from './handlers/post-agreement';
import { handlePutAgreement } from './handlers/put-agreement';

interface PluginOptions {
  routeOptions: RouteOptions;
}

export const agreementPlugin: Plugin<PluginOptions> = {
  name: 'agreement-plugin',
  version: '1.0.0',
  register: async (server, { routeOptions }) => {
    server.route({
      method: 'GET',
      path: '/api/agreements',
      handler: handleGetAgreements,
    });
    server.route({
      method: 'GET',
      path: '/api/agreement/{id}',
      handler: handleGetAgreement,
      options: routeOptions,
    });
    server.route({
      method: 'POST',
      path: '/api/agreement',
      handler: handlePostAgreement,
      options: routeOptions,
    });
    server.route({
      method: 'PUT',
      path: '/api/agreement/{id}',
      handler: handlePutAgreement,
      options: routeOptions,
    });
    server.route({
      method: 'DELETE',
      path: '/api/agreement/{id}',
      handler: handleDeleteAgreement,
    });
  },
};
