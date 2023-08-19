import _ from 'lodash';

const buildTree = (file1, file2) => {
  const uniqueKeys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedKeys = _.sortBy(uniqueKeys);

  const result = sortedKeys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, state: 'nested', children: buildTree(file1[key], file2[key]) };
    }
    if (!Object.hasOwn(file1, key)) {
      return { key, value: file2[key], state: 'added' };
    }
    if (!Object.hasOwn(file2, key)) {
      return { key, value: file1[key], state: 'deleted' };
    }
    if (file1[key] === file2[key]) {
      return { key, value: file1[key], state: 'unchanged' };
    }
    return {
      key, value: file2[key], state: 'changed', oldValue: file1[key],
    };
  });
  return result;
};

export default buildTree;
