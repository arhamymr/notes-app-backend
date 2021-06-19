const { nanoid } = require('nanoid');
const youtubedl = require('youtube-dl-exec')

const downloadHandler = async (request, h) => {
  const { url } = request.params;
  let yt = null
  try {
    await youtubedl(`www.youtube.com/watch?v=${url}`, {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: `www.youtube.com/watch?v=${url}`
    })
    .then(output => {
      yt = output
    });

    const response = h.response({
      status: 'success',
      message: 'Ok boy',
      data: yt,
    });

  } catch (error) {
    console.log(new Error(error));
  }
  
  return yt;
}

module.exports = {
  downloadHandler
}