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
    const result = node.map((element) => {
      switch (element.state) {
        case 'added':
          return `${getIndent(depth)}+ ${element.key}: ${stringify(element.value, depth)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${element.key}: ${stringify(element.value, depth)}`;
        case 'changed':
          return `${getIndent(depth)}- ${element.key}: ${stringify(element.oldValue, depth)}\n${getIndent(depth)}+ ${element.key}: ${stringify(element.value, depth)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${element.key}: ${stringify(element.value, depth)}`;
        case 'nested':
          return `${getIndent(depth)}  ${element.key}: {\n${iter(element.children, depth + 1)}\n${getIndent(depth)}  }`;
        default:
          throw new Error(`${element.state} unknown state`);
      }
    });
    return [...result].join('\n');
  };
  const outputResult = iter(tree, 1);
  return `{\n${outputResult}\n}`;
};
export default stylishTree;
