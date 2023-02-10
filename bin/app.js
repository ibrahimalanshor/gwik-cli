#!/usr/bin/env node

const { program } = require('commander');
const { newApplicationAction, makeModuleAction } = require('../src/actions');

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

program.parse();
