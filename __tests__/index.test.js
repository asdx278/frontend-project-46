import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const expectFile = readFileSync(getFixturePath('expectFile.txt'), 'utf-8');

test('test genDiff json', () => {
  const file1 = getFixturePath('json-test-file-1.json');
  const file2 = getFixturePath('json-test-file-2.json');
  expect(genDiff(file1, file2)).toBe(expectFile);
});

test('test genDiff yaml', () => {
  const file1 = getFixturePath('yaml-test-file-1.yaml');
  const file2 = getFixturePath('yaml-test-file-2.yaml');
  expect(genDiff(file1, file2)).toBe(expectFile);
});

test('test genDiff yml', () => {
  const file1 = getFixturePath('yaml-test-file-1.yml');
  const file2 = getFixturePath('yaml-test-file-2.yml');
  expect(genDiff(file1, file2)).toBe(expectFile);
});

test('test genDiff without extension', () => {
  const file1 = getFixturePath('json-test-file-1');
  const file2 = getFixturePath('json-test-file-2');
  expect(genDiff(file1, file2)).toBe(expectFile);
});

test('test genDiff unsupported extension', () => {
  const file1 = getFixturePath('yaml-test-file-1.yaml');
  const file2 = getFixturePath('unsupported.woof');
  function genDiffError() {
    genDiff(file1, file2);
  }
  expect(genDiffError).toThrow(new Error('File extension error.'));
});
