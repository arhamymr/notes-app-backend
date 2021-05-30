/* eslint-disable no-undef */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: '13.250.117.113',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();
