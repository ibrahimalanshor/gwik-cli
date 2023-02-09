const path = require('path');
const { print } = require('../../lib/print');
const { gitClone, gitInit } = require('../../lib/git');
const {
  isDirectoryExists,
  removeDirectory,
  readFile,
  writeFile,
} = require('../../lib/fs');
const { updatePackageJson } = require('../../lib/package');

module.exports = async function newApplicationAction(dir) {
  const dirPath = path.resolve(dir);

  print(`Checking directory...`);
  const directoryExists = await isDirectoryExists(dirPath);

  if (directoryExists) throw new Error('directory already exists');

  print(`Cloning project...`);
  await gitClone(`https://github.com/ibrahimalanshor/gwik-app`, dir);
  await removeDirectory(path.resolve(dir, '.git'));

  print('Setting up project...');
  const packageJson = updatePackageJson(
    await readFile(path.resolve(dir, 'package.json')),
    {
      name: dir,
      repository: {
        type: 'git',
        url: '',
      },
      bugs: {
        url: '',
      },
      homepage: '',
    }
  );

  await writeFile(path.resolve(dir, 'package.json'), packageJson);
  await gitInit(dirPath);

  print('Done. Now Run:');
  print(`cd ${dir}`);
  print('npm install');
  print('npm run dev');
};
