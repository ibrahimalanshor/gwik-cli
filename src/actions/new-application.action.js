const path = require('path');
const { gitClone } = require('../../lib/git');
const {
  isDirectoryExists,
  removeDirectory,
  readFile,
  writeFile,
} = require('../../lib/fs');
const { updatePackageJson } = require('../../lib/package');

module.exports = async function newApplicationAction(dir) {
  const directoryExists = await isDirectoryExists(path.resolve(dir));

  if (directoryExists) throw new Error('directory already exists');

  await gitClone(`https://github.com/ibrahimalanshor/gwik-app`, dir);
  await removeDirectory(path.resolve(dir, '.git'));

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
};
