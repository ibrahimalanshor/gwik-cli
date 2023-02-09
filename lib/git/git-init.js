const { promisify } = require('node:util');
const child_process = require('child_process');
const exec = promisify(child_process.exec);

module.exports = async function gitInit(dirPath = null) {
  try {
    await exec('git init', { cwd: dirPath });
  } catch (err) {
    throw new Error('failed to initialize git repository');
  }
};
