const { notes } = require('./notes');
const { nanoid } = require('nanoid');

exports.findAllNoteHandler = () => ({
  status: 'success',
  data: notes,
});

exports.getNoteHandler = (req, res) => {
  const { id } = req.params;

  const note = notes.filter((item) => item.id === id)[0];

  if (note) {
    return {
      status: 'success',
      data: note
    };
  }

  return res.response({
    status: 'fail',
    message: 'catatan tidak ditemukan'
  });
};

exports.addNoteHandler = (req, res) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newQuote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newQuote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = res.response({
      status: 'success',
      message: 'Note success added!',
      data: {
        note: id
      }
    });

    response.code(201);
    return response;
  }

  const response = res.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

exports.updateNoteHandler = (req, res) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    const updatedAt = new Date().toISOString();

    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    return res.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
  }

  return res.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
};

exports.deleteNoteHandler = (req, res) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    return res.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
  }

  return res.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
};