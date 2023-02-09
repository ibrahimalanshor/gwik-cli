const fs = require('node:fs/promises');

module.exports = async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, { encoding: 'utf-8' });
  } catch (err) {
    throw new Error('failed to read file');
  }
};
