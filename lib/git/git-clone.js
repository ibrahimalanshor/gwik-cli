const { promisify } = require('node:util');
const child_process = require('child_process');
const exec = promisify(child_process.exec);

module.exports = async function gitClone(url, dir = null) {
  try {
    await exec(`git clone ${url} ${dir}`);
  } catch (err) {
    throw new Error('failed to clone git repository');
  }
};
