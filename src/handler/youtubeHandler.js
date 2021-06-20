const youtubedl = require('youtube-dl-exec')

const downloadHandler = async (request) => {
  const { url } = request.params;
  try {
    return await youtubedl(`www.youtube.com/watch?v=${url}`)
    .then(output => output);
  } catch (error) {
    console.log(new Error(error));
  }
}

module.exports = {
  downloadHandler
}