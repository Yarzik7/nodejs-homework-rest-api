const Jimp = require('jimp');

const processingImgByJimp = async (tempPath, newPath) => {
  const tempAvatar = await Jimp.read(tempPath);
  tempAvatar.resize(250, 250).write(newPath);
};

module.exports = processingImgByJimp;
