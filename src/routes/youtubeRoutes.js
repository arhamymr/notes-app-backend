const {
  downloadHandler,
} = require('../handler/youtubeHandler');

const ytRoutes= [
  {
    method: 'GET',
    path: '/youtube/{url}',
    handler: downloadHandler,
  },
]

module.exports = ytRoutes;
