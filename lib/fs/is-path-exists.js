const { access } = require('node:fs/promises');

module.exports = async function isPathExists(path) {
  try {
    await access(path);

    return true;
  } catch (err) {
    return false;
  }
};
