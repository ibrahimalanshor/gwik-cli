const { print } = require('../../lib/print');
const {
  isPathExists,
  makeDirectory,
  writeFile,
  readFile,
} = require('../../lib/fs');
const { toCase } = require('../../lib/string');
const { generateRequest } = require('../templates');
const { updateExports } = require('../common');
const path = require('path');

async function validateType(type) {
  const availableTypes = ['body', 'multipart'];

  if (!availableTypes.includes(type))
    throw new Error(`type ${type} is not available`);
}

module.exports = async function makeRequestAction(name, options) {
  const { type } = options;
  const request = name.toLowerCase();
  const module = options.module.toLowerCase();
  const modulePath = path.resolve('src', 'modules', module);
  const requestDirPath = path.resolve(modulePath, 'requests');
  const filePath = path.resolve(requestDirPath, `${request}.request.js`);
  const exportsPath = path.resolve(requestDirPath, 'index.js');
  const requestExport = toCase.toCamelCase(...request.split('-'));

  validateType(type);

  print('Checking module...');
  if (!(await isPathExists(modulePath))) {
    throw new Error(`module ${module} is not exists`);
  }

  print('Checking file...');
  if (await isPathExists(requestDirPath)) {
    if (await isPathExists(filePath)) {
      throw new Error(`file ${filePath} already exists`);
    }
  } else {
    await makeDirectory(requestDirPath);
  }

  print('Creating request file...');
  await writeFile(filePath, generateRequest(type));

  await writeFile(
    exportsPath,
    updateExports(
      (await isPathExists(exportsPath)) ? await readFile(exportsPath) : '',
      requestExport,
      `./${request}.request.js`
    )
  );

  print('Done');
};
