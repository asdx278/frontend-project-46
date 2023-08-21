import stylishTree from './stylish.js';
import plainTree from './plain.js';

const makeBeautiful = (tree, formatter) => {
  switch (formatter) {
    case 'plain':
      return plainTree(tree);
    case 'stylish':
      return stylishTree(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`${formatter} format is not supported`);
  }
};

export default makeBeautiful;
