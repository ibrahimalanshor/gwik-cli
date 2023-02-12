const { rm } = require('node:fs/promises');

module.exports = async function removeDirectory(directoryPath) {
  try {
    await rm(directoryPath, { recursive: true, force: true });
  } catch (err) {
    throw new Error('failed to remove directory');
  }
};
