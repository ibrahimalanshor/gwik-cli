#!/usr/bin/env node

const { program } = require('commander');
const {
  newApplicationAction,
  makeModuleAction,
  makeRequestAction,
  makeMiddlewareAction,
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
  .option('-t, --type <type>', 'Module Type', 'base')
  .action(makeModuleAction);

program
  .command('make:request')
  .description('New Request')
  .argument('<name>', 'Request Name')
  .requiredOption('-m, --module <name>', 'Module Name')
  .option('-t, --type <type>', 'Request Type', 'body')
  .action(makeRequestAction);

program
  .command('make:middleware')
  .description('New Middleware')
  .argument('<name>', 'Middleware Name')
  .action(makeMiddlewareAction);

program.parse();
