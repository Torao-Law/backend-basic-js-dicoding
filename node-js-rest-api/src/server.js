require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes/index');

const init = async () => {
  const server = Hapi.server({
    // eslint-disable-next-line no-undef
    port: process.env.PORT,
    host: 'localhost',
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();