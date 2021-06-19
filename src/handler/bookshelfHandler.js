const { nanoid } = require('nanoid');
const { bookshelfs } = require('../storage');

const addBookshelf = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
   } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const newBookshelf = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    id,
    insertedAt,
    updatedAt,
  }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    })
    response.code(400)
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })
    response.code(400)
    return response;
  }
  
  bookshelfs.push(newBookshelf);
  const isSuccess = bookshelfs.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBookshelf = (request) => {
  const { reading, finished, name} = request.query;
  let filterBooks = []
  
  if (reading === '1') {
    filterBooks = bookshelfs.filter(item => item.reading)
    filterBooks = filterBooks.map(item => ({
      "id": item.id,
      "name": item.name,
      "publisher": item.publisher,
    }));
    return {
      status: 'success',
      data: { books: filterBooks }
    };
  }
  
  if (reading === '0') {
    filterBooks = bookshelfs.filter(item => !item.reading)
    filterBooks = filterBooks.map(item => ({
      "id": item.id,
      "name": item.name,
      "publisher": item.publisher,
    }));
    return {
      status: 'success',
      data: { books: filterBooks }
    };
  }

  if (finished === '1') {
    filterBooks = bookshelfs.filter(item => item.finished)
    filterBooks = filterBooks.map(item => ({
      "id": item.id,
      "name": item.name,
      "publisher": item.publisher,
    }));
    return {
      status: 'success',
      data: { books: filterBooks }
    };
  }

  if (finished === '0') {
    filterBooks = bookshelfs.filter(item => !item.finished)
    filterBooks = filterBooks.map(item => ({
      "id": item.id,
      "name": item.name,
      "publisher": item.publisher,
    }));
    return {
      status: 'success',
      data: { books: filterBooks }
    };
  }

  if (name) {
    filterBooks = bookshelfs.filter(item => item.name.toLowerCase().includes("dicoding"))
    filterBooks = filterBooks.map(item => ({
      "id": item.id,
      "name": item.name,
      "publisher": item.publisher,
    }));
    return {
      status: 'success',
      data: { books: filterBooks }
    };
  }

  filterBooks = bookshelfs.map(item => ({
    "id": item.id,
    "name": item.name,
    "publisher": item.publisher,
  }));

  return {
    status: 'success',
    data: { books: filterBooks }
  };
}

const getBookshelfById = (request, h) => {
  const { bookid } = request.params;
  const book = bookshelfs.filter((item) => item.id === bookid)[0];
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: { book }
    })
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  });

  response.code(404);
  return response;
}

const updateBookshelf = (request, h) => {
  const { bookid } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = bookshelfs.findIndex((note) => note.id === bookid);

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    })

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    })

    response.code(400);
    return response;
  }

  if (index !== -1) {
    bookshelfs[index] = {
      ...bookshelfs[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
      data: {
        data: bookshelfs[index]
      }
    })

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  })

  response.code(404);
  return response;
  
}

const deleteBookshelf = (request, h) => {
  const { bookid } = request.params;

  const index = bookshelfs.findIndex((item) => item.id === bookid);

  if (index !== -1) {
    bookshelfs.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  })

  response.code(404);
  return response;
}

module.exports = {
  addBookshelf,
  getAllBookshelf,
  getBookshelfById,
  updateBookshelf,
  deleteBookshelf,
}