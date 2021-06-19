const {
  addBookshelf,
  getAllBookshelf,
  getBookshelfById,
  updateBookshelf,
  deleteBookshelf,
} = require('../handler/bookshelfHandler');

const bookshelfRoutes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookshelf,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBookshelf,
  },
  {
    method: "GET",
    path: "/books/{bookid}",
    handler: getBookshelfById,
  },
  {
    method: 'PUT',
    path: "/books/{bookid}",
    handler: updateBookshelf,
  },
  {
    method: "DELETE",
    path: "/books/{bookid}",
    handler: deleteBookshelf,
  }
]

module.exports = bookshelfRoutes;