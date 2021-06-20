/* eslint-disable no-undef */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : 'ec2-13-229-212-243.ap-southeast-1.compute.amazonaws.com',
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