const {
  isPathExists,
  makeDirectory,
  writeFile,
  readFile,
} = require('../../lib/fs');
const { print } = require('../../lib/print');
const { toCase } = require('../../lib/string');
const path = require('path');
const { generateMiddleware } = require('../templates');
const { updateExports } = require('../common');

module.exports = async function makeMiddlewareAction(name) {
  const normalName = toCase.toCamelCase(...name.replace('-', ' ').split(' '));
  const filename = `${name}.middleware.js`;
  const middlewareDirPath = path.resolve('src', 'common', 'middlewares');
  const filePath = path.resolve(middlewareDirPath, filename);
  const exportsPath = path.resolve(middlewareDirPath, 'index.js');

  print('Checking directory...');
  if (await isPathExists(middlewareDirPath)) {
    if (await isPathExists(filePath)) {
      throw new Error(`middleware ${name} already exists`);
    }
  } else {
    await makeDirectory(middlewareDirPath);
  }

  print('Creating middleware...');
  await writeFile(filePath, generateMiddleware(normalName));
  await writeFile(
    exportsPath,
    updateExports(
      (await isPathExists(exportsPath)) ? await readFile(exportsPath) : '',
      normalName,
      `./${filename}`
    )
  );

  print('Done...');
};
