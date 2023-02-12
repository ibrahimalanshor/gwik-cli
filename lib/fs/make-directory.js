const { mkdir } = require('node:fs/promises');

module.exports = async function makeDirectory(directoryPath) {
  try {
    await mkdir(directoryPath, { recursive: true });
  } catch (err) {
    throw new Error('failed to make directory');
  }
};
