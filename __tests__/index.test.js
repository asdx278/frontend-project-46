import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index';
import stylishTree from '../src/formatters/stylish.js';
import makeBeautiful from '../src/formatters/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const expectFile = readFileSync(getFixturePath('expectFile.txt'), 'utf-8');
const expectNestedFile = readFileSync(getFixturePath('expectNestedFile.txt'), 'utf-8');

test('test genDiff json stylish', () => {
  const file1 = getFixturePath('json-test-file-1.json');
  const file2 = getFixturePath('json-test-file-2.json');
  expect(genDiff(file1, file2, 'stylish')).toBe(expectFile);
});

test('test genDiff yaml stylish', () => {
  const file1 = getFixturePath('yaml-test-file-1.yaml');
  const file2 = getFixturePath('yaml-test-file-2.yaml');
  expect(genDiff(file1, file2, 'stylish')).toBe(expectFile);
});

test('test genDiff yml', () => {
  const file1 = getFixturePath('yaml-test-file-1.yml');
  const file2 = getFixturePath('yaml-test-file-2.yml');
  expect(genDiff(file1, file2, 'stylish')).toBe(expectFile);
});

test('test genDiff without extension', () => {
  const file1 = getFixturePath('json-test-file-1');
  const file2 = getFixturePath('json-test-file-2');
  expect(genDiff(file1, file2, 'stylish')).toBe(expectFile);
});

test('test genDiff nested', () => {
  const file1 = getFixturePath('json-nested-test-file-1.json');
  const file2 = getFixturePath('json-nested-test-file-2.json');
  expect(genDiff(file1, file2, 'stylish')).toBe(expectNestedFile);
});

test('test genDiff unsupported extension', () => {
  const file1 = getFixturePath('yaml-test-file-1.yaml');
  const file2 = getFixturePath('unsupported.woof');
  function genDiffError() {
    genDiff(file1, file2, 'stylish');
  }
  expect(genDiffError).toThrow(new Error('File extension error.'));
});

test('test stylishTree unknown state', () => {
  const tree = [{ key: 'follow', value: false, state: 'delet' }, { key: 'host', value: 'hexlet.io', state: 'unchanged' }];
  function stylishTreeError() {
    stylishTree(tree);
  }
  expect(stylishTreeError).toThrow(new Error('Unknown state'));
});

test('test makeBeautiful unsupported format', () => {
  const tree = [{ key: 'follow', value: false, state: 'delet' }, { key: 'host', value: 'hexlet.io', state: 'unchanged' }];
  function makeBeautifulError() {
    makeBeautiful(tree, 'excel');
  }
  expect(makeBeautifulError).toThrow(new Error('Unsupported format'));
});
