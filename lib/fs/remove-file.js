const { rm } = require('node:fs/promises');

module.exports = async function removeFile(filePath) {
  try {
    await rm(filePath);
  } catch (err) {
    throw new Error('failed to remove file');
  }
};
