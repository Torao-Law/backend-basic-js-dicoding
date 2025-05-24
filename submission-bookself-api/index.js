require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./src/routes/bookRoutes.js');

const init = async () => {
  const server = Hapi.server({
    // eslint-disable-next-line no-undef
    port: process.env.PORT,
    // eslint-disable-next-line no-undef
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
