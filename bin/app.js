const { program } = require('commander');
const { newApplicationAction } = require('../src/actions');

program
  .command('new')
  .description('New Application')
  .argument('<name>', 'Directory Name')
  .action(newApplicationAction);

program.parse();
