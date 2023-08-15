import _ from 'lodash';

const makeNewDiff = (key, value, state, oldValue = undefined) => {
  const diff = {
    key,
    value,
    state,
    oldValue,
  };

  return diff;
};

export default (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const uniqueKeys = _.union(keys1, keys2);
  const allDiff = [];
  uniqueKeys.forEach((element) => {
    if (!Object.hasOwn(file1, element)) {
      allDiff.push(makeNewDiff(element, file2[element], 'added'));
    } else if (!Object.hasOwn(file2, element)) {
      allDiff.push(makeNewDiff(element, file1[element], 'deleted'));
    } else if (file1[element] !== file2[element]) {
      allDiff.push(makeNewDiff(element, file2[element], 'changed', file1[element]));
    } else {
      allDiff.push(makeNewDiff(element, file1[element], 'unchanged'));
    }
  });
  const sortedDiff = _.sortBy(allDiff, ['key']);

  const treeDiff = sortedDiff.map(({ key, value, state, oldValue }) => {
    switch (state) {
      case 'added':
        return ` + ${key}: ${value}`;
      case 'deleted':
        return ` - ${key}: ${value}`;
      case 'changed':
        return ` - ${key}: ${value}\n + ${key}: ${oldValue}`;
      case 'unchanged':
        return `   ${key}: ${value}`;
      default:
        break;
    }
  });

  return `{\n${treeDiff.join('\n')}\n}`;
};
