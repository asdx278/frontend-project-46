import { resolve, extname } from 'node:path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import parsedFile from './parser.js';
import buildTree from './buildTree.js';
import makeBeautiful from './formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const buildAbsolutePath = (filepath) => {
    const absolutFilePath = resolve(cwd(), filepath);
    return absolutFilePath;
  };

  const getExtension = (filepath) => {
    const fileExtension = extname(filepath).slice(1);
    return fileExtension;
  };

  const readFile = (file) => readFileSync(file, 'utf8');
  const file1 = parsedFile(readFile(buildAbsolutePath(filepath1)), getExtension(filepath1));
  const file2 = parsedFile(readFile(buildAbsolutePath(filepath2)), getExtension(filepath2));
  const treeDiff = buildTree(file1, file2);
  const result = makeBeautiful(treeDiff, format);

  return result;
};
