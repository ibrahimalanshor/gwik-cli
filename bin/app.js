#!/usr/bin/env node

const { program } = require('commander');
const {
  newApplicationAction,
  makeModuleAction,
  makeRequestAction,
} = require('../src/actions');

program
  .command('new')
  .description('New Application')
  .argument('<name>', 'Directory Name')
  .action(newApplicationAction);

program
  .command('make:module')
  .description('New Module')
  .argument('<name>', 'Module Name')
  .action(makeModuleAction);

program
  .command('make:request')
  .description('New Request')
  .argument('<name>', 'Request Name')
  .requiredOption('-m, --module <name>', 'Module Name')
  .option('-t, --type <type>', 'Request Type', 'body')
  .action(makeRequestAction);

program.parse();
