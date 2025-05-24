const { books } = require('./book');
const { nanoid } = require('nanoid');

exports.findAllBookHandler = (req, res) => {
  const { reading, finished, name } = req.query;

  let data = [];

  if (reading !== undefined || finished !== undefined || name !== undefined) {
    if (reading == 1) {
      data = books.filter((book) => book.reading == true);
    } else if (reading == 0) {
      data = books.filter((book) => book.reading == false);
    }

    if (finished == 1) {
      data = books.filter((book) => book.finished == true);
    } else if (finished == 0) {
      data = books.filter((book) => book.finished == false);
    }

    if (name) {
      data = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }
  } else {
    data = books;
  }

  // const dataResponse =
  //   data.length > 0
  //     ? data.map((item) => ({
  //         id: item.id,
  //         name: item.name,
  //         publisher: item.publisher,
  //       }))
  //     : [];

  const response = res.response({
    status: 'success',
    data: {
      books: data,
      // books: dataResponse,
    },
  });

  response.code(200);
  return response;
};

exports.getBookHandler = (req, res) => {
  const { id } = req.params;

  const Book = books.filter((item) => item.id === id)[0];

  if (Book) {
    const response = res.response({
      status: 'success',
      data: Book,
    });

    response.code(200);
    return response;
  }

  const response = res.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

exports.addBookHandler = (req, res) => {
  const data = req.payload;

  if (!data.name) {
    const response = res.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi data buku dengan benar!',
    });

    response.code(400);
    return response;
  }

  if (data.readPage > data.pageCount) {
    const response = res.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newBook = {
    id,
    name: data.name,
    year: data.year,
    author: data.author,
    summary: data.summary,
    publisher: data.publisher,
    pageCount: data.pageCount,
    readPage: data.readPage,
    reading: data.reading,
    finished: data.pageCount === data.readPage ? true : false,
    createdAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((Book) => Book.id === id).length > 0;

  if (isSuccess) {
    const response = res.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan!',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  } else {
    const response = res.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan!',
    });

    response.code(500);
    return response;
  }
};

exports.updateBookHandler = (req, res) => {
  const { id } = req.params;
  const data = req.payload;

  if (!data.name) {
    const response = res.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku!',
    });

    response.code(400);
    return response;
  }

  if (data.readPage > data.pageCount) {
    const response = res.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  const index = books.findIndex((item) => item.id === id);

  if (index !== -1) {
    const updatedAt = new Date().toISOString();

    books[index] = {
      ...books[index],
      name: data.name ? data.name : books[index].name,
      year: data.year ? data.year : books[index].year,
      author: data.author ? data.author : books[index].author,
      summary: data.summary ? data.summary : books[index].summary,
      publisher: data.publisher ? data.publisher : books[index].publisher,
      pageCount: data.pageCount ? data.pageCount : books[index].pageCount,
      readPage: data.readPage ? data.readPage : books[index].readPage,
      reading: data.reading !== undefined ? data.reading : books[index].reading,
      updatedAt,
    };

    const response = res.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = res.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

exports.deleteBookHandler = (req, res) => {
  const { id } = req.params;

  const index = books.findIndex((item) => item.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = res.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = res.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });

  response.code(500);
  return response;
};
