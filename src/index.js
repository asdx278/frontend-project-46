import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import buildTree from './buildTree.js';
import parsedFile from './parser.js';

const buildAbsolutePath = (filepath) => {
  const absolutFilePath = resolve(cwd(), filepath);
  return absolutFilePath;
};

const readFile = (file) => readFileSync(file, 'utf8');

export default (filepath1, filepath2) => {
  const file1 = parsedFile(readFile(buildAbsolutePath(filepath1)));
  const file2 = parsedFile(readFile(buildAbsolutePath(filepath2)));

  const result = buildTree(file1, file2);

  return result;
};
