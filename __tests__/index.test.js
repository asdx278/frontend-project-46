import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/index';
import stylishTree from '../src/formatters/stylish';
import makeBeautiful from '../src/formatters';
import plainTree from '../src/formatters/plain';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

const testFiles = [
  ['nested1.json', 'nested2.json', 'stylish', 'expectNestedStylish.txt'],
  ['nested1.json', 'nested2.json', 'json', 'expectNestedJson.txt'],
  ['nested1.json', 'nested2.json', 'plain', 'expectNestedPlain.txt'],
  ['nested1.yaml', 'nested2.yaml', 'stylish', 'expectNestedStylish.txt'],
  ['nested1.yaml', 'nested2.yaml', 'json', 'expectNestedJson.txt'],
  ['nested1.yaml', 'nested2.yaml', 'plain', 'expectNestedPlain.txt'],
  ['nested1.yml', 'nested2.yml', 'stylish', 'expectNestedStylish.txt'],
  ['nested1.yml', 'nested2.yml', 'json', 'expectNestedJson.txt'],
  ['nested1.yml', 'nested2.yml', 'plain', 'expectNestedPlain.txt'],
];

describe.each(testFiles)('input: %p AND %p; output: %p', (file1, file2, format, expected) => {
  test('general', () => {
    const f1 = getFixturePath(file1);
    const f2 = getFixturePath(file2);
    expect(genDiff(f1, f2, format)).toBe(getFile(expected));
  });
});

describe('unknown state', () => {
  const tree = [{ key: 'follow', value: false, state: 'delet' }, { key: 'host', value: 'hexlet.io', state: 'unchanged' }];
  test('stylishTree unknown state', () => {
    function stylishTreeError() {
      stylishTree(tree);
    }
    expect(stylishTreeError).toThrow(new Error('delet unknown state'));
  });

  test('plainTree unknown state', () => {
    function plainTreeError() {
      plainTree(tree);
    }
    expect(plainTreeError).toThrow(new Error('delet unknown state'));
  });
});
test('genDiff unsupported extension', () => {
  const file1 = getFixturePath('nested1.json');
  const file2 = getFixturePath('unsupported.woof');
  function genDiffError() {
    genDiff(file1, file2, 'stylish');
  }
  expect(genDiffError).toThrow(new Error('woof extension is not supported'));
});

test('makeBeautiful unsupported format', () => {
  const tree = [{ key: 'follow', value: false, state: 'delet' }, { key: 'host', value: 'hexlet.io', state: 'unchanged' }];
  function makeBeautifulError() {
    makeBeautiful(tree, 'excel');
  }
  expect(makeBeautifulError).toThrow(new Error('excel format is not supported'));
});
