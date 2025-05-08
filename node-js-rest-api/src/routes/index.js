const NoteHandler = require('../handler/handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      console.log(req);
      console.log(res);
      return 'hello world';
    }
  },
  {
    method: 'GET',
    path: '/notes',
    handler: NoteHandler.findAllNoteHandler,
  },
  {
    method: 'GET',
    path: '/note/{id}',
    handler: NoteHandler.getNoteHandler,
  },
  {
    method: 'POST',
    path: '/note',
    handler: NoteHandler.addNoteHandler,
  },
  {
    method: 'PUT',
    path: '/note/{id}',
    handler: NoteHandler.updateNoteHandler,
  },
  {
    method: 'DELETE',
    path: '/note/{id}',
    handler: NoteHandler.deleteNoteHandler,
  }
];

module.exports = routes;