const {
  makeDirectory,
  isPathExists,
  removeDirectory,
  writeFile,
  readFile,
} = require('../../lib/fs');
const { print } = require('../../lib/print');
const path = require('path');
const { generateController, generateRouter } = require('../templates');
const { updateRoutes } = require('../common');

module.exports = async function makeModule(name) {
  const moduleName = name.toLowerCase();
  const dirPath = path.resolve('src', 'modules', moduleName);
  const routesPath = path.resolve('src', 'routes.js');

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
      generateController(moduleName)
    ),
    writeFile(
      path.resolve(dirPath, `${moduleName}.routes.js`),
      generateRouter(moduleName)
    ),
    writeFile(routesPath, updateRoutes(await readFile(routesPath), moduleName)),
  ]);

  print('Done');
};
