const NoteHandler = require('../handler/handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: NoteHandler.addNoteHandler,
  }
];

module.exports = routes;