const notesRoutes = require("./routes/notesRoutes");
const bookshelfRoutes = require("./routes/bookshelfRoutes");
const ytRoutes = require("./routes/youtubeRoutes");

const routes = [
  ...notesRoutes,
  ...ytRoutes,
  ...bookshelfRoutes,
]

module.exports = routes;