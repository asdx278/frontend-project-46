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
    const result = node.flatMap((element) => {
      switch (element.state) {
        case 'added':
          return `Property '${ancestry}${element.key}' was added with value: ${stringify(element.value)}`;
        case 'deleted':
          return `Property '${ancestry}${element.key}' was removed`;
        case 'changed':
          return `Property '${ancestry}${element.key}' was updated. From ${stringify(element.oldValue)} to ${stringify(element.value)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return `${iter(element.children, `${ancestry}${element.key}.`)}`;
        default:
          throw new Error(`${element.state} unknown state`);
      }
    });
    return [...result].join('\n');
  };

  const outputResult = iter(tree, '');

  return outputResult;
};
export default plainTree;
