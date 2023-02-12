const {
  makeDirectory,
  isPathExists,
  removeDirectory,
  writeFile,
  readFile,
} = require('../../lib/fs');
const { print } = require('../../lib/print');
const { isInclude } = require('../../lib/array');
const path = require('path');
const { generateController, generateRouter } = require('../templates');
const { updateRoutes } = require('../common');

module.exports = async function makeModule(name, options) {
  const { type } = options;
  const moduleName = name.toLowerCase();
  const normalModuleName = moduleName.replace('-', ' ');
  const dirPath = path.resolve('src', 'modules', moduleName);
  const routesPath = path.resolve('src', 'routes.js');

  if (!isInclude(['base', 'crud'], type)) {
    throw new Error(`type ${type} is invalid`);
  }

  print('Checking directory...');
  if (await isPathExists(dirPath)) {
    throw new Error(`module ${moduleName} already exists`);
  }

  print('Creating module...');
  await makeDirectory(path.resolve('src', 'modules', moduleName));

  if (!(await isPathExists(routesPath))) {
    await writeFile(routesPath, '');
  }

  await Promise.all([
    writeFile(
      path.resolve(dirPath, `${moduleName}.controller.js`),
      generateController(normalModuleName, { type })
    ),
    writeFile(
      path.resolve(dirPath, `${moduleName}.routes.js`),
      generateRouter(moduleName, normalModuleName, { type })
    ),
    writeFile(routesPath, updateRoutes(await readFile(routesPath), moduleName)),
  ]);

  print('Done');
};
