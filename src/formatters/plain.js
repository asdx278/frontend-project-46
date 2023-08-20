import _ from 'lodash';

const stringify = (data) => {
  if (typeof data === 'boolean' || typeof data === 'number' || data === null) {
    return `${data}`;
  }
  if (!(_.isObject(data)) || typeof data === 'string') {
    return `'${data}'`;
  }
  return '[complex value]';
};

const plainTree = (tree) => {
  const iter = (node, ancestry = '') => {
    const result = node.flatMap(({
      key, value, state, oldValue, children,
    }) => {
      switch (state) {
        case 'added':
          return `Property '${ancestry}${key}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${ancestry}${key}' was removed`;
        case 'changed':
          return `Property '${ancestry}${key}' was updated. From ${stringify(oldValue)} to ${stringify(value)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return `${iter(children, `${ancestry}${key}.`)}`;
        default:
          throw new Error('Unknown state');
      }
    });
    return [...result].join('\n');
  };

  const outputResult = iter(tree, '');

  return outputResult;
};
export default plainTree;
