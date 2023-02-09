const { access } = require('node:fs/promises');

module.exports = async function isDirectoryExists(directoryPath) {
  try {
    await access(directoryPath);

    return true;
  } catch (err) {
    return false;
  }
};
