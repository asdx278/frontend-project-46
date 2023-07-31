#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();

program
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format');

program.parse();
