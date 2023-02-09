const fs = require('node:fs/promises');

module.exports = async function writeFile(filePath, data) {
  try {
    await fs.writeFile(filePath, data);
  } catch (err) {
    throw new Error('failed to write file');
  }
};
