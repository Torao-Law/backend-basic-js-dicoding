const BookHandlers = require('../handlers/bookHandler');

const routes = [
  {
    method: 'GET',
    path: '/',
    // eslint-disable-next-line no-unused-vars
    handler: (req, res) => {
      return 'hello world';
    }
  },
  {
    method: 'GET',
    path: '/books',
    handler: BookHandlers.findAllBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: BookHandlers.getBookHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: BookHandlers.addBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id?}',
    handler: BookHandlers.updateBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id?}',
    handler: BookHandlers.deleteBookHandler,
  }
];

module.exports = routes;