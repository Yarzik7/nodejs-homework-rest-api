const Jimp = require('jimp');

const processingImgByJimp = async (req, _, next) => {
  const { path } = req.file;

  try {
    const tempAvatar = await Jimp.read(path);
    tempAvatar.resize(250, 250).write(path);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = processingImgByJimp;
