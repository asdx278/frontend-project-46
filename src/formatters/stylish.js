import _ from 'lodash';

const getIndent = (depth, counter = 4) => {
  const replacer = ' ';
  const indent = replacer.repeat((depth * counter) - 2);
  return indent;
};
const stringify = (data, depth = 1) => {
  if (!(_.isObject(data))) {
    return `${data}`;
  }
  const text = Object.entries(data).map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...text, `${getIndent(depth)}  }`].join('\n');
};
const stylishTree = (tree) => {
  const iter = (node, depth = 1) => {
    const result = node.map(({
      key, value, state, oldValue, children,
    }) => {
      switch (state) {
        case 'added':
          return `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${getIndent(depth)}- ${key}: ${stringify(oldValue, depth)}\n${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `${getIndent(depth)}  ${key}: {\n${iter(children, depth + 1)}\n${getIndent(depth)}  }`;
        default:
          throw new Error(`${state} unknown state`);
      }
    });
    return [...result].join('\n');
  };
  const outputResult = iter(tree, 1);
  return `{\n${outputResult}\n}`;
};
export default stylishTree;
